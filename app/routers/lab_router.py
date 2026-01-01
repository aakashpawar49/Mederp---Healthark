from fastapi import APIRouter, HTTPException
from app.models.lab import LabReport, LabTestCatalog, ReportVersion
from app.models.patient import Patient
from datetime import datetime

router = APIRouter(prefix="/lab", tags=["Lab Management"])

# 1. Add a Test to the Catalog (Admin only usually)
@router.post("/catalog")
async def add_test_to_catalog(test: LabTestCatalog):
    await test.create()
    return test

# 2. Create a Lab Order (When Doctor prescribes)
@router.post("/order")
async def create_lab_order(uhid: str, test_code: str, doctor_name: str):
    # Fetch Patient
    patient = await Patient.find_one(Patient.uhid == uhid)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    # Fetch Test Details
    test_info = await LabTestCatalog.find_one(LabTestCatalog.code == test_code)
    if not test_info:
        raise HTTPException(status_code=404, detail="Test code not found")

    # Create Empty Report
    report = LabReport(
        patient=patient,
        doctor_name=doctor_name,
        test_code=test_code,
        test_name=test_info.name,
        status="PENDING"
    )
    await report.create()
    return {"message": "Order Created", "report_id": str(report.id)}

# 3. Enter/Update Results (The Versioning Logic)
@router.put("/result/{report_id}")
async def update_result(report_id: str, results: dict, technician_id: str):
    report = await LabReport.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    if report.status == "FINALIZED":
        # If finalized, we MUST archive the old version before changing
        old_version = ReportVersion(
            version_number=report.version,
            data=report.current_data,
            edited_by="Previous-Tech", # In real app, store this in DB
            timestamp=datetime.now()
        )
        report.history.append(old_version)
        report.version += 1

    # Update current data
    report.current_data = results
    report.status = "FINALIZED"
    
    await report.save()
    return {"message": "Report Updated", "current_version": report.version}