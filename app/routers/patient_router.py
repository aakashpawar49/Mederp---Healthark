from fastapi import APIRouter, HTTPException
from app.models.patient import Patient
from typing import List

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/", response_model=Patient)
async def register_patient(patient: Patient):
    # 1. Check if phone number already exists
    existing_patient = await Patient.find_one(Patient.phone == patient.phone)
    if existing_patient:
        raise HTTPException(status_code=400, detail="Patient with this phone already exists")
    
    # 2. Save to DB
    await patient.create()
    return patient

@router.get("/{uhid}", response_model=Patient)
async def get_patient(uhid: str):
    patient = await Patient.find_one(Patient.uhid == uhid)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient