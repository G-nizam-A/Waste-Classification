import threading
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from utils import predict, input_trash
from real_time_detection_faster_rcnn import real_time_processing
import time
import uvicorn
import shutil
import os
from dotenv import load_dotenv
import urllib.error

load_dotenv()  # Loads environment variables from the .env file

# Ensure the environment variable 'IPV4URL' is defined
IPV4URL = os.getenv('IPV4URL')  # Fetch the value from the environment variable

if IPV4URL is None:
    # Handle the case where 'IPV4URL' is not defined
    raise ValueError("Environment variable 'IPV4URL' is not defined")


origins = [ 
    "http://localhost:8000", 
]


app = FastAPI(
    title="🗑️ Waste Classification",
    summary= "This is an API that helps users classify waste and learn how to handle it"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


# Global flag to control the background process
is_running = False
# Define a global stop event
stop_event = threading.Event()

@app.post("/real-time")
async def start_real_time(background_tasks: BackgroundTasks):
    global is_running, status
    if is_running:  # Check if already running
        print('run is_running')
        return {"message": "Real-time processing already running",
                "status": status}
    
    url = IPV4URL+'/shot.jpg'
    try:
        urllib.request.urlopen(url)

        if stop_event.is_set():
            print('run stop_event')

            stop_event.clear()  # Reset stop event to allow restarting
        is_running = True
        background_tasks.add_task(real_time_processing, stop_event, url)  # Start background processing
        status = True

    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f"Network error: {e}")
        status = False

    return {"message": "Real-time processing started",
            "status": status}

@app.post("/stop-real-time")
async def stop_real_time():
    global is_running
    if not is_running:
        print('stop is_running')

        return {"message": "Real-time processing not running"}
    
    is_running = False
    if not stop_event.is_set():  # Ensure event isn't already set
        print('stop stop_event')

        stop_event.set()  # Signal to stop background processing
    return {"message": "Real-time processing stopped"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
