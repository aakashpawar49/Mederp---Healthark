from beanie import Document, Link
from pydantic import Field
from beanie import Document, Link
from datetime import datetime
from enum import Enum
from app.models.patient import Patient

class VisitStatus(str, Enum):
    WAITING = "WAITING"
    IN_CONSULT = "IN_CONSULT"
    COMPLETED = "COMPLETED"
    MISSED = "MISSED"

class OPDQueue(Document):
    token_number: int
    patient: Link[Patient] # Reference to Patient Doc
    doctor_id: str
    visit_reason: str
    status: VisitStatus = VisitStatus.WAITING
    check_in_time: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "opd_queue"