from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import init_db

# Import your actual routers
from app.routers import (
    patient_router,
    opd_router,
    doctor_router,
    inventory_router,
    lab_router
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to DB and Initialize Beanie Models
    await init_db()
    print("✅ Database Connected & Beanie Initialized")
    yield
    # Shutdown logic
    print("⛔ Database Disconnected")

app = FastAPI(lifespan=lifespan, title="MedERP API", version="2.5")

# --- CORS CONFIGURATION (THE FIX) ---
# We use ["*"] to allow ALL connections. 
# This fixes the "Blocked by CORS Policy" error instantly.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Register Routers ---
app.include_router(patient_router.router)
app.include_router(opd_router.router)
app.include_router(doctor_router.router)
app.include_router(inventory_router.router)
app.include_router(lab_router.router)

@app.get("/")
async def root():
    return {"message": "MedERP Enterprise API is Live"}