import os
import subprocess
import re
import json
import glob
from PIL import Image
import pytesseract

# Set tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Category Map
CATEGORY_MAP = [
    (1, 2, "Cover / About BabySteps", ""),
    (3, 3, "Size Reference Chart", ""),
    (4, 6, "Classroom Furniture", "Plastic chairs & tables"),
    (7, 10, "Wooden Classroom Furniture", "Tables, desks, dual-seaters"),
    (11, 14, "Classroom Furniture", "Zoo Buddy, Mini Minds, desk combos"),
    (15, 15, "Rubber Wood Furniture", "Premium tables"),
    (16, 19, "Activity", "Rockers/climbers, benches, beds, soft blocks"),
    (20, 21, "Fence", "Play junction, plastic balls, wooden sensory fence"),
    (22, 29, "Play Equipments", "Ball pens, play houses, play castles"),
    (30, 32, "Slides", "Castle, Unicorn, Elephant, Rabbit, Jungle Gym"),
    (33, 34, "Slides Swing Sets", "Castle combos, elephant swings"),
    (35, 39, "Rockers & See-Saw", "Pony, elephant, duck, fish, combos"),
    (40, 41, "Rockers", "Puppy, Jumbo Giraffe, Tusker, Stallion"),
    (42, 49, "Rockers / Play Equipment", "Variety"),
    (50, 50, "Play Equipment", "Scooter, Fish Spin Seat, Hit Me"),
    (51, 59, "Swings / Balance / More Play", ""),
    (60, 60, "Wooden Shelf / Racks", "Book shelf, shoe rack, podium"),
    (61, 69, "More Storage / Cubbies / School Furniture", ""),
    (70, 70, "Activity Sensory Toys", "Sorting, mats, dough kits"),
    (71, 79, "More Sensory Toys", ""),
    (80, 80, "Toys", "Doctor/Kitchen/Tool/Beauty Sets, Magna Tiles"),
    (81, 89, "More Toys & Games", ""),
    (90, 97, "Sensory / Wall Toys", "Crocodile wall, rocket wall, busy boards"),
    (98, 98, "Contact / Back cover", "")
]

def get_category_info(page_num):
    for start, end, cat, subcat in CATEGORY_MAP:
        if start <= page_num <= end:
            return cat, subcat
    return "Unknown", ""

def process_page(pdf_path, page_num):
    poppler_path = r'C:\Users\Sumit singhvi\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin'
    pdftoppm_path = os.path.join(poppler_path, 'pdftoppm.exe')
    temp_prefix = f'temp_p{page_num}'
    
    try:
        # Using 300 DPI for better OCR
        subprocess.run([pdftoppm_path, '-f', str(page_num), '-l', str(page_num), '-png', '-r', '300', pdf_path, temp_prefix], shell=True, check=True)
        files = glob.glob(f'{temp_prefix}*.png')
        if not files: return ""
        
        text = pytesseract.image_to_string(Image.open(files[0]))
        for f in files: os.remove(f)
        return text
    except Exception as e:
        print(f"Error on page {page_num}: {e}")
        return ""

def parse_products(text, page_num, category, sub_category):
    products = []
    lines = text.split('\n')
    lines = [l.strip() for l in lines if l.strip()]
    
    # Flags for the whole page
    is_best_seller_page = "BEST SELLER" in text.upper()
    is_new_page = "NEW ARRIVAL" in text.upper() or "NEW" in text.upper()
    
    # Identify all MRP lines
    mrp_indices = [i for i, line in enumerate(lines) if 'MRP' in line.upper()]
    
    for idx in mrp_indices:
        line = lines[idx]
        # MRP might have multiple values if multi-column
        mrp_matches = re.finditer(r'MRP\s*:\s*[^\d]*([\d,]+)', line, re.IGNORECASE)
        
        # Also look for codes and names in proximity
        # We'll try to extract all codes and names in the block above this MRP line
        # but below the previous MRP line
        prev_idx = -1
        for p_idx in mrp_indices:
            if p_idx < idx:
                prev_idx = p_idx
            else:
                break
        
        block = lines[prev_idx+1 : idx+1]
        
        # Extract all codes in the block
        codes = []
        for bline in block:
            matches = re.findall(r'([A-Z0-9]{2,}-\s*[A-Z0-9]+)', bline)
            for m in matches:
                codes.append(m.replace(' ', ''))
        
        # Extract all MRPs in the line
        mrps = []
        for m in mrp_matches:
            mrp_str = m.group(1).replace(',', '')
            try:
                mrps.append(int(mrp_str))
            except:
                mrps.append(0)
        
        # If we have multiple codes and multiple MRPs, try to pair them
        # If mismatch, use the first ones found or try to match by line index
        for i in range(max(len(codes), len(mrps))):
            code = codes[i] if i < len(codes) else (codes[0] if codes else f"P{page_num}-{i}")
            mrp = mrps[i] if i < len(mrps) else (mrps[0] if mrps else 0)
            
            # Name extraction: find a line that's not a code, dimensions, or MRP
            name = ""
            dimensions = ""
            for bline in reversed(block[:-1]): # excluding the MRP line itself
                if any(c in bline for c in codes): continue
                if re.search(r'[LWH]\s*[-:]?\s*\d+', bline, re.IGNORECASE):
                    dimensions = bline
                    continue
                if not name and len(bline) > 3:
                    name = bline
                    break
            
            if code:
                slug = code.lower().replace(' ', '-')
                products.append({
                    "id": slug,
                    "name": name if name else code,
                    "model_code": code,
                    "category": category,
                    "sub_category": sub_category,
                    "dimensions": dimensions,
                    "mrp": mrp,
                    "colors_available": "colors" in text.lower() or "available" in text.lower(),
                    "is_best_seller": is_best_seller_page,
                    "is_new": is_new_page,
                    "page_number": page_num
                })
    
    return products

def main():
    pdf_path = r'D:\work\thebabysteps\BS Catalogue Final2026 june indoor.pdf'
    all_products = []
    
    # Process pages 4 to 97
    for page in range(4, 98):
        print(f"Processing page {page}...")
        category, sub_category = get_category_info(page)
        text = process_page(pdf_path, page)
        if text:
            page_products = parse_products(text, page, category, sub_category)
            all_products.extend(page_products)
    
    # Deduplicate by model_code
    unique_products = {}
    for p in all_products:
        if p['model_code'] not in unique_products:
            unique_products[p['model_code']] = p
    
    final_list = list(unique_products.values())
    
    with open('products.json', 'w') as f:
        json.dump(final_list, f, indent=2)
    
    print(f"Total products extracted: {len(final_list)}")

if __name__ == "__main__":
    main()
