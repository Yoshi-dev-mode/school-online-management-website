from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
products = []
orders = []

# Pydantic models
class Product(BaseModel):
    name: str
    price: float
    category: str
    image: str

class OrderItem(BaseModel):
    name: str
    price: float
    quantity: int

class Order(BaseModel):
    items: List[OrderItem]
    total: float
    tip: float
    payment: str
    date: str
    time: str
    status: str

# ------------------ Products ------------------
@app.get("/products")
def get_products():
    return products

@app.post("/products")
def add_product(product: Product):
    new_product = product.dict()
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return {"message": "Product added", "product": new_product}

@app.put("/products/{product_id}")
def update_product(product_id: int, updated: Product):
    for p in products:
        if p["id"] == product_id:
            p.update(updated.dict())
            return {"message": "Product updated", "product": p}
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    global products
    for p in products:
        if p["id"] == product_id:
            products = [prod for prod in products if prod["id"] != product_id]
            return {"message": f"Product {product_id} deleted"}
    raise HTTPException(status_code=404, detail="Product not found")

# ------------------ Orders ------------------
@app.get("/orders")
def get_orders():
    return orders

@app.post("/orders")
def add_order(order: Order):
    new_order = order.dict()
    new_order["id"] = len(orders) + 1
    orders.append(new_order)
    return {"message": "Order added", "order": new_order}

@app.patch("/orders/{order_id}")
def update_order_status(order_id: int, status_update: dict):
    for order in orders:
        if order["id"] == order_id:
            if "status" in status_update:
                order["status"] = status_update["status"]
                return {"message": "Order status updated", "order": order}
            else:
                raise HTTPException(status_code=400, detail="No status provided")
    raise HTTPException(status_code=404, detail="Order not found")
