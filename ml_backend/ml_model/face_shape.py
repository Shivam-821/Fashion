# face_shape.py
import cv2
import mediapipe as mp
import numpy as np

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True)

def analyze_face_shape(image_path):
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image_rgb)

    if not results.multi_face_landmarks:
        return "❌ No face detected. Try using a clearer or frontal image with better lighting."

    landmarks = results.multi_face_landmarks[0].landmark
    h, w, _ = image.shape

    def get_point(idx):
        return np.array([int(landmarks[idx].x * w), int(landmarks[idx].y * h)])

    # Key points
    chin = get_point(152)
    left_jaw = get_point(234)
    right_jaw = get_point(454)
    forehead = get_point(10)
    left_cheekbone = get_point(93)
    right_cheekbone = get_point(323)
    left_temple = get_point(127)
    right_temple = get_point(356)

    # Measure distances
    jaw_width = np.linalg.norm(left_jaw - right_jaw)
    cheekbone_width = np.linalg.norm(left_cheekbone - right_cheekbone)
    temple_width = np.linalg.norm(left_temple - right_temple)
    face_height = np.linalg.norm(forehead - chin)

    # Calculate ratios
    jaw_cheek_ratio = jaw_width / cheekbone_width
    temple_cheek_ratio = temple_width / cheekbone_width
    height_width_ratio = face_height / cheekbone_width

    # Classify face shape
    def classify_face_shape():
        if height_width_ratio > 1.6:
            if jaw_cheek_ratio > 1.05:
                return "Oval"
            else:
                return "Oblong"
        if 1.3 < height_width_ratio <= 1.6:
            if jaw_cheek_ratio < 0.9:
                return "Heart"
            elif jaw_cheek_ratio > 1.1:
                return "Diamond"
            elif abs(jaw_cheek_ratio - 1.0) < 0.05 and abs(temple_cheek_ratio - 1.0) < 0.05:
                return "Square"
            else:
                return "Oval"
        if height_width_ratio <= 1.3:
            if jaw_cheek_ratio > 1.05:
                return "Pear"
            else:
                return "Round"
        return "Unknown" # return it if not able to detect, tum dekh lena isse rakhna hai ya nahi
