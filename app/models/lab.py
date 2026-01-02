from beanie import Document, Link
from typing import List, Dict, Optional
from datetime import datetime
from app.models.patient import Patient
from pydantic import BaseModel, Field

class LabTestCatalog(Document):
    code: str # "LIPID_PROFILE"
    name: str
    price: float
    reference_ranges: str 

    class Settings:
        name = "lab_catalog"

class ReportVersion(BaseModel):
    version_number: int
    data: Dict
    edited_by: str
    timestamp: datetime

class LabReport(Document):
    patient: Link[Patient]
    doctor_name: str
    test_code: str
    test_name: str
    status: str = "PENDING" # PENDING, FINALIZED
    current_data: Dict = {}
    version: int = 1
    history: List[ReportVersion] = [] # For auditing changes
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "lab_reports"