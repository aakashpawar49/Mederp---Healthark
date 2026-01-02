from beanie import Document
from pydantic import Field
from datetime import date, datetime
from typing import Optional
import uuid

class Patient(Document):
    # System Fields
    uhid: str = Field(default_factory=lambda: f"UHID-{uuid.uuid4().hex[:6].upper()}")
    registered_at: datetime = Field(default_factory=datetime.now)

    # Demographics
    prefix: Optional[str] = None
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    name: str = "" # Default to empty, calculated in router
    
    dob: Optional[str] = None 
    # CHANGE: Make age Optional so validation doesn't fail on empty input
    age: Optional[str] = None 
    gender: str
    blood_group: Optional[str] = None
    marital_status: Optional[str] = None

    # Contact & Address
    phone: str = Field(..., unique=True)
    email: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    national_id_type: Optional[str] = None
    national_id_no: Optional[str] = None

    # Emergency & Insurance
    emergency_name: Optional[str] = None
    emergency_phone: Optional[str] = None
    emergency_relation: Optional[str] = None
    
    insurance_provider: Optional[str] = None
    policy_number: Optional[str] = None
    coverage_validity: Optional[str] = None

    class Settings:
        name = "patients"