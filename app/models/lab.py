from beanie import Document, Link
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.models.patient import Patient

# 1. The Menu (Catalog)
class ReferenceRange(BaseModel):
    gender: str  # "M", "F", "CHILD"
    min_val: float
    max_val: float
    unit: str    # "mg/dL"

class LabTestCatalog(Document):
    code: str              # "LIPID-01"
    name: str              # "Lipid Profile"
    price: float
    parameters: List[str]  # ["Cholesterol", "HDL", "LDL"] - helps UI know what to ask
    
    class Settings:
        name = "lab_catalog"

# 2. The Result (Report)
class ReportVersion(BaseModel):
    version_number: int
    data: Dict[str, Any]   # The actual results e.g. {"Cholesterol": 200}
    edited_by: str         # User ID of technician
    timestamp: datetime

class LabReport(Document):
    patient: Link[Patient]
    doctor_name: str       # Name of prescribing doctor
    test_code: str         # Link to Catalog
    test_name: str         # Stored for historical accuracy
    
    # Current active data
    status: str            # "PENDING", "FINALIZED"
    current_data: Dict[str, Any] = {} 
    
    # Version Control (Audit Trail)
    version: int = 1
    history: List[ReportVersion] = []
    
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "lab_reports"