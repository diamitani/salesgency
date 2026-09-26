import os
import glob
import json

signal_dir = "/Users/patmini/salesgency/Signal"
out_dir = "/Users/patmini/salesgency/Signal_Processed"

index = {"files": []}

for root, dirs, files in os.walk(signal_dir):
    for file in files:
        if file == ".DS_Store" or file.endswith(".zip"):
            continue
        path = os.path.join(root, file)
        ext = os.path.splitext(file)[1].lower()
        rel_path = os.path.relpath(path, signal_dir)
        index["files"].append({"name": file, "path": rel_path, "ext": ext})

with open(os.path.join(out_dir, "index.json"), "w") as f:
    json.dump(index, f, indent=2)

print(f"Indexed {len(index['files'])} files.")
