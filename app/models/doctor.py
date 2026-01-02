from beanie import Document
from typing import List, Dict
from datetime import datetime

class Shift(Document):
    day: str  # "Monday", "Tuesday"
    start_time: str # "09:00"
    end_time: str   # "12:00"

class DoctorProfile(Document):
    name: str
    specialization: str
    degrees: str
    license_number: str
    department: str
    phone: str
    # Availability: { "0": [{start: "09:00", end:"12:00"}], "1": ... }
    # 0=Monday, 6=Sunday
    availability: Dict[str, List[Dict[str, str]]] = {} 

    class Settings:
        name = "doctors"

class DailySchedule(Document):
    doctor_id: str
    date: str # "2025-10-25"
    # Slots structure: [{"time": "09:00", "is_booked": False, "patient_id": None}]
    slots: List[Dict] = []

    class Settings:
        name = "schedules"