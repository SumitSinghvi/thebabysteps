import os
import subprocess
from PIL import Image
import pytesseract

# Set tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def process_page(pdf_path, page_num):
    # Convert page to image using pdftoppm
    poppler_path = r'C:\Users\Sumit singhvi\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin'
    pdftoppm_path = os.path.join(poppler_path, 'pdftoppm.exe')
    
    # temp output prefix
    temp_prefix = f'temp_page_{page_num}'
    
    # Run pdftoppm
    subprocess.run([pdftoppm_path, '-f', str(page_num), '-l', str(page_num), '-png', pdf_path, temp_prefix], shell=True)
    
    # The output file will be temp_prefix-1.png or similar
    image_path = f'{temp_prefix}-1.png'
    if not os.path.exists(image_path):
        # try without the -1 if only one page
        image_path = f'{temp_prefix}.png'
    
    if os.path.exists(image_path):
        text = pytesseract.image_to_string(Image.open(image_path))
        os.remove(image_path)
        return text
    else:
        # Check for alternative naming like temp_page_4-01.png
        import glob
        files = glob.glob(f'{temp_prefix}*.png')
        if files:
            text = pytesseract.image_to_string(Image.open(files[0]))
            for f in files: os.remove(f)
            return text
    return ""

pdf_path = r'D:\work\thebabysteps\catelog_backup\BS Catalogue Final2026 june indoor.pdf'
text = process_page(pdf_path, 30)
print(f"--- PAGE 30 TEXT ---\n{text}\n-------------------")
