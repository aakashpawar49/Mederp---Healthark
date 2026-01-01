from beanie import Document
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class EmergencyContact(BaseModel):
    name: str
    phone: str
    relation: str

class Patient(Document):
    # Beanie uses 'Document' to map to MongoDB collections automatically
    uhid: str = Field(default_factory=lambda: f"UHID-{uuid.uuid4().hex[:8].upper()}")
    first_name: str
    last_name: str
    dob: str  # keeping string for simplicity, ideally datetime
    gender: str
    phone: str
    email: Optional[EmailStr] = None
    address: str
    emergency_contact: EmergencyContact
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "patients" # Collection name in MongoDB
        indexes = [
            "uhid", # Index for fast search
            "phone" # Index for checking duplicates
        ]