import os
import base64
from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def analyze_prescription_image(image_bytes: bytes):
    # 1. Encode image to Base64
    base64_image = base64.b64encode(image_bytes).decode('utf-8')

    # 2. Call GPT-4o (Vision Model)
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful medical assistant. Your goal is to extract information from a prescription image and explain it simply to a patient. Output JSON only with keys: 'medicines' (list of name, dosage, timing), 'diagnosis_inferred', 'advice', 'warnings'."
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Analyze this prescription."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        response_format={ "type": "json_object" }
    )
    
    return response.choices[0].message.content