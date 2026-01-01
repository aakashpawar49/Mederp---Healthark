from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
import certifi

# Import all models
from app.models.patient import Patient
from app.models.opd import OPDQueue
from app.models.doctor import DoctorProfile, DailySchedule
from app.models.inventory import InventoryItem

async def init_db():
    # We add tlsCAFile=certifi.where() to fix the SSL error
    client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        tlsCAFile=certifi.where() 
    )
    
    await init_beanie(
        database=client[settings.DB_NAME],
        document_models=[
            Patient,
            OPDQueue,
            DoctorProfile,
            DailySchedule,
            InventoryItem,
        ]
    )