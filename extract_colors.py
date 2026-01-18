import cv2
import numpy as np
from sklearn.cluster import KMeans
import webcolors

def get_hex_colors(image_path, n_colors=5):
    # Read image
    img = cv2.imread(image_path)
    if img is None:
        return []
    
    # Convert to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Reshape to a list of pixels
    pixels = img.reshape(-1, 3)
    
    # Use KMeans to find dominant colors
    kmeans = KMeans(n_clusters=n_colors, random_state=42)
    kmeans.fit(pixels)
    
    colors = kmeans.cluster_centers_
    
    # Convert to hex
    hex_colors = []
    for color in colors:
        hex_colors.append('#{:02x}{:02x}{:02x}'.format(int(color[0]), int(color[1]), int(color[2])))
        
    return hex_colors

# User provided images
images = [
    r"C:/Users/gaurt/.gemini/antigravity/brain/0558116d-1ba9-4db9-b18c-cd1d7c9b2bf1/uploaded_image_0_1768615770051.png",
    r"C:/Users/gaurt/.gemini/antigravity/brain/0558116d-1ba9-4db9-b18c-cd1d7c9b2bf1/uploaded_image_1_1768615770051.png",
    r"C:/Users/gaurt/.gemini/antigravity/brain/0558116d-1ba9-4db9-b18c-cd1d7c9b2bf1/uploaded_image_2_1768615770051.png"
]

for i, img_path in enumerate(images):
    print(f"Image {i}: {get_hex_colors(img_path)}")
