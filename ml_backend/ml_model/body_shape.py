# body_shape.py
import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True)

def predict_body_shape(image_path):
    # Load your image
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    if not results.pose_landmarks:
        return "No pose landmarks detected."
    
    # Get landmark dictionary
    landmarks = results.pose_landmarks.landmark

    # Helper to convert normalized to pixel coordinates
    def get_point(landmark):
        h, w = image.shape[:2]
        return int(landmark.x * w), int(landmark.y * h)

    # Extract key body points
    left_shoulder = get_point(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER])
    right_shoulder = get_point(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER])
    left_hip = get_point(landmarks[mp_pose.PoseLandmark.LEFT_HIP])
    right_hip = get_point(landmarks[mp_pose.PoseLandmark.RIGHT_HIP])
    left_waist = ((left_shoulder[0] + left_hip[0]) // 2, (left_shoulder[1] + left_hip[1]) // 2)
    right_waist = ((right_shoulder[0] + right_hip[0]) // 2, (right_shoulder[1] + right_hip[1]) // 2)


    # Calculate distances
    def distance(p1, p2):
        return np.linalg.norm(np.array(p1) - np.array(p2))

    shoulder_width = distance(left_shoulder, right_shoulder)
    hip_width = distance(left_hip, right_hip)
    waist_width = distance(left_waist, right_waist)

    # Calculate ratios
    shoulder_hip_ratio = shoulder_width / hip_width
    waist_hip_ratio = waist_width / hip_width

    if abs(shoulder_hip_ratio - 1) < 0.1 and waist_hip_ratio < 0.8:
        return "Hourglass"
    elif shoulder_hip_ratio < 0.9:
        return "Pear"
    elif shoulder_hip_ratio > 1.1:
        return "Inverted Triangle"
    elif waist_hip_ratio > 0.95:
        return "Rectangle"
    else:
        return "Apple"

# similary yaha pe bhi you can add the visulaization part for testing purpose