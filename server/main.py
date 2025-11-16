from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Next.js frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example food list (could come from database later)
food_pictures = [
    {"name": "ADOBO", "img": "/example-foods/adobo.png", "price": "₱120", "type": "food"},
    {"name": "COFFEE", "img": "/example-foods/coffee.png", "price": "₱130", "type": "drink"},
]

@app.get("/foods")
def get_foods():
    return food_pictures

@app.get("/foods/{name}")
def get_food(name: str):
    for food in food_pictures:
        if food["name"].lower() == name.lower():
            return food
    return {"error": "Food not found"}
