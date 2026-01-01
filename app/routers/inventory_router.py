from fastapi import APIRouter, HTTPException
from app.models.inventory import InventoryItem, Batch
from datetime import date

router = APIRouter(prefix="/inventory", tags=["Pharmacy"])

@router.post("/add-item", response_model=InventoryItem)
async def add_inventory(item: InventoryItem):
    # Auto-calculate total stock on creation
    item.total_stock = sum(b.quantity for b in item.batches)
    await item.create()
    return item

@router.post("/dispense")
async def dispense_medicine(sku: str, quantity_needed: int):
    # 1. Find the drug
    item = await InventoryItem.find_one(InventoryItem.sku == sku)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    if item.total_stock < quantity_needed:
        raise HTTPException(status_code=400, detail=f"Insufficient stock. Available: {item.total_stock}")

    # 2. FEFO Logic: Sort batches by expiry date (Ascending)
    item.batches.sort(key=lambda x: x.expiry_date)
    
    remaining_to_deduct = quantity_needed
    
    for batch in item.batches:
        if remaining_to_deduct <= 0:
            break
            
        if batch.quantity > 0:
            if batch.quantity >= remaining_to_deduct:
                # This batch has enough to cover the rest
                batch.quantity -= remaining_to_deduct
                remaining_to_deduct = 0
            else:
                # Take everything from this batch and move to next
                remaining_to_deduct -= batch.quantity
                batch.quantity = 0

    # 3. Update Total Stock and Save to DB
    item.total_stock -= quantity_needed
    await item.save()
    
    return {
        "message": "Dispensed successfully", 
        "dispensed_qty": quantity_needed,
        "remaining_stock": item.total_stock
    }