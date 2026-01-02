from fastapi import APIRouter, HTTPException
from app.models.patient import Patient
from typing import List
from datetime import datetime, date

router = APIRouter(prefix="/patients", tags=["Patients"])

def calculate_age(dob_str: str) -> str:
    try:
        birth_date = datetime.strptime(dob_str, "%Y-%m-%d").date()
        today = date.today()
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        return str(age)
    except:
        return "0"

@router.post("/", response_model=Patient)
async def register_patient(patient_data: Patient):
    # 1. Check for duplicates
    existing = await Patient.find_one(Patient.phone == patient_data.phone)
    if existing:
        raise HTTPException(status_code=400, detail="Patient with this phone number already exists.")

    # 2. Auto-generate Full Name
    full_name = f"{patient_data.first_name} {patient_data.last_name}"
    patient_data.name = full_name.strip()

    # 3. Auto-Calculate Age if missing
    if not patient_data.age and patient_data.dob:
        patient_data.age = calculate_age(patient_data.dob)

    # 4. Save to DB
    await patient_data.create()
    return patient_data

@router.get("/search", response_model=List[Patient])
async def search_patients(query: str):
    # Search by Name OR Phone OR UHID
    patients = await Patient.find({
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"phone": {"$regex": query, "$options": "i"}},
            {"uhid": {"$regex": query, "$options": "i"}}
        ]
    }).to_list()
    return patients