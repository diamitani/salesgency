import json
import os
import subprocess
import hashlib

data = json.load(open("filtered_index.json"))
signal_dir = "/Users/patmini/salesgency/Signal"
out_file = "/Users/patmini/salesgency/Signal_Processed/signal-master-data-source.md"

seen_hashes = set()
master_content = ["# Signal Master Data Source\n\n"]

def get_text_docx(filepath):
    try:
        xml = subprocess.check_output(f'unzip -p "{filepath}" word/document.xml 2>/dev/null', shell=True)
        import xml.etree.ElementTree as ET
        root = ET.fromstring(xml)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        text = '\n'.join(node.text for node in root.findall('.//w:t', ns) if node.text)
        return text
    except Exception as e:
        return ""

def get_text_pdf(filepath):
    try:
        text = subprocess.check_output(f'pdftotext "{filepath}" - 2>/dev/null', shell=True).decode('utf-8')
        return text
    except Exception as e:
        return ""

for f in data["files"]:
    filepath = os.path.join(signal_dir, f["path"])
    ext = f["ext"]
    
    # skip very large files for csv/json to avoid bloat
    if ext in {".csv", ".json"} and os.path.getsize(filepath) > 500000:
        continue
        
    text = ""
    if ext in {".md", ".txt", ".json", ".skill", ".csv"}:
        try:
            with open(filepath, 'r', errors='ignore') as fp:
                text = fp.read()
        except:
            pass
    elif ext == ".docx":
        text = get_text_docx(filepath)
    elif ext == ".pdf":
        text = get_text_pdf(filepath)
        
    if text.strip():
        # Deduplication
        content_hash = hashlib.md5(text.encode('utf-8')).hexdigest()
        if content_hash not in seen_hashes:
            seen_hashes.add(content_hash)
            master_content.append(f"## File: {f['name']}\nPath: {f['path']}\n\n```\n{text[:50000]}\n```\n\n")

with open(out_file, "w") as f:
    f.write("".join(master_content))

print(f"Processed into {out_file}, total unique files: {len(seen_hashes)}")
