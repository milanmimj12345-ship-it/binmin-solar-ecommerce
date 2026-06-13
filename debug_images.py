import os
from PIL import Image

def debug_image(name, path):
    if not os.path.exists(path):
        print(f"{name}: {path} DOES NOT EXIST")
        return
    img = Image.open(path)
    print(f"{name}: {path}")
    print(f"  Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    
    # Check corners
    w, h = img.size
    corners = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1)
    ]
    print("  Border pixels:")
    for x, y in corners:
        print(f"    At ({x}, {y}): {img.getpixel((x, y))}")
        
    # Check a few central pixels
    print("  Center pixels:")
    center_points = [
        (w // 2, h // 2), (w // 4, h // 4), (3 * w // 4, 3 * h // 4)
    ]
    for x, y in center_points:
        print(f"    At ({x}, {y}): {img.getpixel((x, y))}")

if __name__ == "__main__":
    brain_dir = r"C:\Users\user\.gemini\antigravity\brain\ec91b4b7-91a6-4256-aea5-3b2f8bfce2e4"
    debug_image("L&T Meter", os.path.join(brain_dir, "media__1781043740642.jpg"))
    debug_image("Microtek AC Cable", os.path.join(brain_dir, "media__1781046878981.jpg"))
    debug_image("Exide Panel", os.path.join(brain_dir, "media__1780791839206.jpg"))
