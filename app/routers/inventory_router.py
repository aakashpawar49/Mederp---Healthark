from fastapi import APIRouter, HTTPException
from typing import List
from app.models.inventory import InventoryItem  # Ensure this import exists

router = APIRouter(prefix="/inventory", tags=["Pharmacy"])

# --- 1. GET ALL ITEMS (This was likely missing) ---
@router.get("/all", response_model=List[InventoryItem])
async def get_all_inventory():
    return await InventoryItem.find_all().to_list()

# --- 2. ADD ITEM ---
@router.post("/add-item", response_model=InventoryItem)
async def add_inventory(item: InventoryItem):
    # Auto-calculate total stock from batches
    # (Ensure your frontend sends at least one batch with quantity)
    if not item.batches:
        item.total_stock = 0
    else:
        item.total_stock = sum(b.quantity for b in item.batches)
    
    await item.create()
    return item

# --- 3. DISPENSE ITEM ---
@router.post("/dispense")
async def dispense_medicine(sku: str, quantity_needed: int):
    item = await InventoryItem.find_one(InventoryItem.sku == sku)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    if item.total_stock < quantity_needed:
        raise HTTPException(status_code=400, detail=f"Insufficient stock. Available: {item.total_stock}")

    # FEFO Logic: Sort batches by expiry date
    item.batches.sort(key=lambda x: x.expiry_date)
    
    remaining = quantity_needed
    for batch in item.batches:
        if remaining <= 0: break
        if batch.quantity >= remaining:
            batch.quantity -= remaining
            remaining = 0
        else:
            remaining -= batch.quantity
            batch.quantity = 0

    item.total_stock -= quantity_needed
    await item.save()
    
    return {"message": "Dispensed", "remaining_stock": item.total_stock}