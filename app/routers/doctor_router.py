from fastapi import APIRouter, HTTPException
from app.models.doctor import DoctorProfile, DailySchedule
from app.models.patient import Patient
from datetime import datetime, timedelta
from app.models.consultation import Consultation
from app.models.opd import OPDQueue, VisitStatus

# --- MISSING IMPORTS ADDED HERE ---
from pydantic import BaseModel 
from beanie import PydanticObjectId
# ----------------------------------

router = APIRouter(prefix="/doctors", tags=["Doctors"])

# Helper function to split time (e.g., 9:00 to 12:00 into 15 min slots)
def generate_slots(start_str, end_str, duration=15):
    fmt = "%H:%M"
    current = datetime.strptime(start_str, fmt)
    end = datetime.strptime(end_str, fmt)
    slots = []
    
    while current < end:
        slots.append({
            "time": current.strftime(fmt),
            "is_booked": False,
            "patient_id": None
        })
        current += timedelta(minutes=duration)
    return slots

@router.post("/create-profile", response_model=DoctorProfile)
async def create_doctor(doctor: DoctorProfile):
    await doctor.create()
    return doctor

@router.post("/schedule/generate")
async def generate_schedule(doctor_id: str, date: str, day_key: str):
    """
    Generates slots for a specific date based on the doctor's rules.
    day_key: '0' for Monday, '1' for Tuesday... '6' for Sunday
    """
    # 1. Find Doctor
    doctor = await DoctorProfile.get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # 2. Check if schedule already exists
    existing = await DailySchedule.find_one(
        DailySchedule.doctor_id == doctor_id,
        DailySchedule.date == date
    )
    if existing:
        return {"message": "Schedule already exists", "schedule_id": str(existing.id)}

    # 3. Get working hours for that day
    if day_key not in doctor.availability:
        raise HTTPException(status_code=400, detail="Doctor does not work on this day")

    daily_slots = []
    # Loop through shifts (e.g., Morning 9-12, Evening 5-8)
    for shift in doctor.availability[day_key]:
        new_slots = generate_slots(shift.start_time, shift.end_time)
        daily_slots.extend(new_slots)

    # 4. Save to DB
    schedule = DailySchedule(
        doctor_id=str(doctor.id),
        date=date,
        slots=daily_slots
    )
    await schedule.create()
    return schedule

@router.get("/{doctor_id}/slots/{date}")
async def get_slots(doctor_id: str, date: str):
    schedule = await DailySchedule.find_one(
        DailySchedule.doctor_id == doctor_id,
        DailySchedule.date == date
    )
    if not schedule:
        return {"slots": []}
    return schedule

# --- Booking Logic ---

class BookingRequest(BaseModel):
    schedule_id: str 
    time_slot: str   
    patient_uhid: str

@router.post("/book")
async def book_slot(request: BookingRequest):
    # 1. Verify Patient exists
    patient = await Patient.find_one(Patient.uhid == request.patient_uhid)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # 2. Atomic Update
    # We find the schedule AND ensure the slot is currently NOT booked
    result = await DailySchedule.find_one(
        DailySchedule.id == PydanticObjectId(request.schedule_id),
        DailySchedule.slots.time == request.time_slot,
        DailySchedule.slots.is_booked == False
    ).update(
        {
            "$set": {
                "slots.$.is_booked": True, # The $ is the array operator
                "slots.$.patient_id": str(patient.id)
            }
        }
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Slot already booked or invalid")

    return {"message": f"Appointment confirmed for {request.time_slot}"}

@router.post("/consultation/submit")
async def submit_consultation(consult: Consultation):
    # 1. Save the Consultation Record
    await consult.create()
    
    # 2. Mark the Patient as "COMPLETED" in the OPD Queue
    # We find the active visit for this patient & doctor
    await OPDQueue.find_one(
        OPDQueue.patient.id == consult.patient_id, # You might need to adjust based on how you store IDs
        OPDQueue.doctor_id == consult.doctor_id,
        OPDQueue.status == VisitStatus.IN_CONSULT
    ).update({"$set": {"status": VisitStatus.COMPLETED}})
    
    return {"message": "Consultation Saved Successfully", "id": str(consult.id)}