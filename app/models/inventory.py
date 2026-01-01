from beanie import Document
from pydantic import BaseModel, Field
from datetime import date
from typing import List

class Batch(BaseModel):
    batch_number: str
    expiry_date: date
    quantity: int
    supplier: str

class InventoryItem(Document):
    name: str              # "Paracetamol 500mg"
    sku: str               # Unique Barcode/ID
    category: str          # "Tablet", "Syrup"
    price_per_unit: float
    
    # Store batches inside the item for atomic updates
    batches: List[Batch] = []
    
    total_stock: int = 0   # Sum of all batches (Auto-calculated)
    
    class Settings:
        name = "inventory"