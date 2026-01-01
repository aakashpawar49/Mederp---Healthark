from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import init_db
# Import the routers we are about to create/verify
from app.routers import patient_router, opd_router, doctor_router, inventory_router

app = FastAPI(title="MedERP API")

# Allow Frontend (React) to talk to Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def start_db():
    await init_db()
    print("✅ Database Connected")

# Register the modules
app.include_router(patient_router.router)
app.include_router(opd_router.router)
app.include_router(doctor_router.router)
app.include_router(inventory_router.router)

@app.get("/")
def home():
    return {"message": "MedERP System is Live"}