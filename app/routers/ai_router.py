from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.ai_service import analyze_prescription_image
import json

router = APIRouter(prefix="/ai", tags=["AI Modules"])

@router.post("/analyze-prescription")
async def analyze_prescription(file: UploadFile = File(...)):
    # 1. Validate File Type
    if file.content_type not in ["image/jpeg", "image/png", "application/pdf"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload JPG or PNG.")

    # 2. Read File
    contents = await file.read()

    # 3. Process with AI
    try:
        raw_json = await analyze_prescription_image(contents)
        parsed_data = json.loads(raw_json)
        return {
            "status": "success", 
            "data": parsed_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Processing Failed: {str(e)}")