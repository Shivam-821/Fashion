from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import os
import shutil 
import uuid

from ..ml_model import predict_body_shape, predict_skin_tone, analyze_face_shape

router = APIRouter(
    prefix='/predict',
    tags="Predicts"
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/predict-skin-tone")
async def skin_tone_api(file: UploadFile = File(...)):
    file_name = f"{uuid.uuid4()}.jpg"
    file_location = f"{UPLOAD_DIR}/{file_name}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = predict_skin_tone(file_location)
    os.remove(file_location)
    return JSONResponse({"skin_tone": result})

@router.post("/predict-body-shape")
async def body_shape_api(file: UploadFile = File(...)):
    file_name = f"{uuid.uuid4()}.jpg"
    file_location = f"{UPLOAD_DIR}/{file_name}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = predict_body_shape(file_location)
    os.remove(file_location)
    return JSONResponse({"body_shape": result})


@router.post("/predict-face-shape")
async def face_shape_api(file: UploadFile = File(...)):
    file_name = f"{uuid.uuid4()}.jpg"
    file_location = f"{UPLOAD_DIR}/{file_name}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = analyze_face_shape(file_location)
    os.remove(file_location)
    return JSONResponse({"face_shape": result})