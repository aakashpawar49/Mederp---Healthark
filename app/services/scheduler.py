from datetime import datetime, timedelta

def generate_slots_for_time_range(start_str: str, end_str: str, duration: int):
    """
    Input: "09:00", "10:00", 15
    Output: [{"time": "09:00"}, {"time": "09:15"}, {"time": "09:30"}, {"time": "09:45"}]
    """
    slots = []
    fmt = "%H:%M"
    current = datetime.strptime(start_str, fmt)
    end = datetime.strptime(end_str, fmt)

    while current < end:
        slots.append({
            "time": current.strftime(fmt),
            "is_booked": False,
            "patient_id": None
        })
        current += timedelta(minutes=duration)
    
    return slots