from beanie import Document
from pydantic import BaseModel
from typing import List
from datetime import date

class Batch(BaseModel):
    batch_number: str = "" #Default 
    expiry_date: date = None #Default to None if not provided
    quantity: int = 0
    supplier: str = ""

class InventoryItem(Document):
    name: str = " Unknown Medicine "
    sku: str = "NO-SKU" # Stock Keeping Unit (Unique ID)
    category: str = "General " 
    unit_price: float = 0.0
    
    total_stock: int = 0
    batches: List[Batch] = [] # List of batches for FEFO
    min_stock_alert: int = 10

    class Settings:
        name = "inventory"