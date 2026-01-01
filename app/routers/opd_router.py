from fastapi import APIRouter, HTTPException
from app.models.opd import OPDQueue, VisitStatus
from app.models.patient import Patient
from datetime import datetime, date, time

router = APIRouter(prefix="/opd", tags=["OPD"])

@router.post("/check-in")
async def opd_check_in(uhid: str, doctor_id: str, reason: str):
    # 1. Find Patient
    patient = await Patient.find_one(Patient.uhid == uhid)
    if not patient:
        raise HTTPException(status_code=404, detail="Invalid UHID")

    # 2. Generate Token Number (Count existing patients for this doc today)
    today_start = datetime.combine(date.today(), time.min)
    count = await OPDQueue.find(
        OPDQueue.doctor_id == doctor_id,
        OPDQueue.check_in_time >= today_start
    ).count()
    
    new_token = count + 1

    # 3. Create Queue Entry
    entry = OPDQueue(
        patient=patient,
        doctor_id=doctor_id,
        token_number=new_token,
        visit_reason=reason
    )
    await entry.create()
    return {"message": "Check-in successful", "token": new_token, "id": str(entry.id)}

@router.get("/doctor/{doctor_id}/live-queue")
async def get_live_queue(doctor_id: str):
    # Fetch all patients waiting for this doctor today, sorted by token
    today_start = datetime.combine(date.today(), time.min)
    
    queue = await OPDQueue.find(
        OPDQueue.doctor_id == doctor_id,
        OPDQueue.status == VisitStatus.WAITING,
        OPDQueue.check_in_time >= today_start
    ).sort(+OPDQueue.token_number).to_list()
    
    # We need to fetch the actual patient details (fetch_links=True is a Beanie feature)
    for q in queue:
        await q.fetch_link(OPDQueue.patient)
        
    return queue