# skin_tone.py
import torch
import clip
import face_recognition
from PIL import Image

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Define cosmetic skin tone labels
skin_tones = ["porcelain skin", "ivory skin", "honey skin", "olive skin", "walnut skin"]

# Crop face from image
def crop_face(image_path):
    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)
    if face_locations:
        top, right, bottom, left = face_locations[0]
        return image[top:bottom, left:right]
    else:
        return None

# Predict skin tone using CLIP
def predict_skin_tone(image_path):
    face = crop_face(image_path)
    if face is None:
        return "Face not detected."

    face_pil = Image.fromarray(face)
    image_input = preprocess(face_pil).unsqueeze(0).to(device)

    # Tokenize labels
    text_inputs = torch.cat([clip.tokenize(f"a person with {desc}") for desc in skin_tones]).to(device)

    # Get embeddings
    with torch.no_grad():
        image_features = model.encode_image(image_input)
        text_features = model.encode_text(text_inputs)

    # Normalize
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)

    # Compute similarity
    similarities = (100.0 * image_features @ text_features.T).softmax(dim=-1)

    # Predict  
    best_match_idx = similarities.argmax().item()
    best_match = skin_tones[best_match_idx]
    confidence = similarities[0, best_match_idx].item()

    return {"skin_tone": best_match, "confidence": confidence}


# removed the show face part as it is not required to plot it, par karna ho to add kar dena.