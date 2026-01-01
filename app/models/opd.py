from beanie import Document, Link
from pydantic import Field
from datetime import datetime
from app.models.patient import Patient
from enum import Enum

class VisitStatus(str, Enum):
    WAITING = "WAITING"
    IN_CONSULTATION = "IN_CONSULTATION"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class OPDQueue(Document):
    patient: Link[Patient] # Reference to the Patient Document
    doctor_id: str         # ID of the doctor (User ID)
    token_number: int      # Simple 1, 2, 3 sequence for the day
    visit_reason: str
    vitals: dict = {}      # BP, Temp, Weight (captured by nurse)
    status: VisitStatus = VisitStatus.WAITING
    check_in_time: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "opd_queue"