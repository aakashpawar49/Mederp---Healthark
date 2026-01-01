from beanie import Document
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

# Helper model for availability rules
class TimeWindow(BaseModel):
    start_time: str # "09:00"
    end_time: str   # "12:00"

class DoctorProfile(Document):
    name: str
    specialization: str
    # Key = Day of week (0=Monday, 6=Sunday), Value = List of working hours
    # Example: {"0": [{"start": "09:00", "end": "12:00"}]}
    availability: Dict[str, List[TimeWindow]] 
    slot_duration_minutes: int = 15 # Default 15 mins

    class Settings:
        name = "doctors"

class Slot(BaseModel):
    time: str       # "09:15"
    is_booked: bool = False
    patient_id: Optional[str] = None

class DailySchedule(Document):
    doctor_id: str
    date: str       # "2024-12-29" (YYYY-MM-DD)
    slots: List[Slot]

    class Settings:
        name = "schedules"
        indexes = [
            # Compound index to ensure 1 schedule per doctor per day
            ["doctor_id", "date"]
        ]