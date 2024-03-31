from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from utils import predict, input_trash
import time
import uvicorn
import shutil
import os

origins = [ 
    "http://localhost:8000", 
]


app = FastAPI(
    title="🗑️ Waste Classification",
    summary= "This is an API that helps users classify waste and learn how to handle it"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Define the upload directory
UPLOAD_DIR = Path("upload")
UPLOAD_DIR.mkdir(exist_ok=True)

class trash(BaseModel):
    type_trash:  str
    
@app.get("/download/{id}")
async def get_image(id: str):
    try:
        file_path = UPLOAD_DIR / id
        return FileResponse(file_path)
    except FileNotFoundError:
        return {"error": "Image not found"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        if not os.path.exists(UPLOAD_DIR):
            os.mkdir(UPLOAD_DIR)

        # Save the uploaded file
        upload_path = f"{UPLOAD_DIR}/{file.filename}"
        with upload_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        print("Upload successful:",upload_path)
        return {"path": f"Upload successful: {upload_path}"}
    except Exception as e:
        return {"error": f"Server error: {str(e)}"}

@app.get("/")
async def root():
    print("Request received at /root endpoint")
    return {"message" : "This is a Waste classification API",
            "help": "Use /predict to get the output for classification"}


def give_advice(Trash: trash):
    start_time = time.time()
    advice = input_trash(Trash)
    return {
        "advice": advice,
        "time": start_time
    }

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    # Save the uploaded file
    upload_path = UPLOAD_DIR / file.filename
    with upload_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    predicted_value, predicted_accuracy = await predict(upload_path)
    
    get_advice = give_advice(predicted_value)
    return {
        "path": upload_path,
        "predicted_value": predicted_value,
        "predicted_accuracy": predicted_accuracy,
        "advice": get_advice,
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
