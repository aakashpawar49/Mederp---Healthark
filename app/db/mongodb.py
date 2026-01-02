from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings

# Import ALL your models here
from app.models.patient import Patient
from app.models.doctor import DoctorProfile, DailySchedule
from app.models.opd import OPDQueue
from app.models.inventory import InventoryItem
from app.models.lab import LabReport, LabTestCatalog
from app.models.consultation import Consultation

async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Initialize Beanie with the database and the list of models
    await init_beanie(
        database=client[settings.DB_NAME],
        document_models=[
            Patient,
            DoctorProfile,
            DailySchedule,
            OPDQueue,
            InventoryItem,
            LabReport,
            LabTestCatalog,
            Consultation
        ]
    )