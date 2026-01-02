from beanie import Document, Link
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from app.models.patient import Patient

class PrescribedMedicine(BaseModel):
    medicine_name: str
    dosage: str  # e.g. "1-0-1" (Morning-Afternoon-Night)
    duration: str # e.g. "5 Days"
    instructions: str = "" # e.g. "After food"

class Consultation(Document):
    patient_id: str  # We store ID string for easier querying
    doctor_id: str
    visit_date: datetime = Field(default_factory=datetime.now)
    
    # Clinical Data
    symptoms: str
    diagnosis: str
    notes: Optional[str] = None
    
    # Orders
    medicines: List[PrescribedMedicine] = []
    lab_tests: List[str] = [] # List of Test Codes e.g. ["CBC", "LIPID"]
    
    class Settings:
        name = "consultations"