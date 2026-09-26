import os
import json
import re
import shutil

# Paths
source_md = "/Users/patmini/salesgency/Signal_Processed/signal-master-data-source.md"
library_dir = "/Users/patmini/salesgency/Signal_Processed/Master_Skill_Library"
index_json = "/Users/patmini/salesgency/Signal_Processed/filtered_index.json"

os.makedirs(library_dir, exist_ok=True)

# We'll read the master data source we created earlier, which has headers like:
# ## File: <filename>
# Path: <path>
# ```
# <content>
# ```

with open(source_md, "r") as f:
    master_content = f.read()

# Regex to find all file blocks
pattern = re.compile(r'## File: (.*?)\nPath: (.*?)\n\n```\n(.*?)\n```', re.DOTALL)
matches = pattern.findall(master_content)

skills_index = []

def format_skill_name(filename):
    name = os.path.splitext(filename)[0]
    name = re.sub(r'[^a-zA-Z0-9\s-]', '', name)
    name = name.strip().replace(" ", "-").lower()
    return name

for filename, filepath, content in matches:
    content = content.strip()
    if not content:
        continue
        
    ext = os.path.splitext(filename)[1].lower()
    
    # We want to convert processes, notes, courses, templates into skills
    # Skip raw data files like huge CSVs if they snuck in
    if ext == ".csv" and len(content) > 10000:
        continue
        
    skill_name = format_skill_name(filename)
    if not skill_name:
        continue
        
    skill_folder = os.path.join(library_dir, skill_name)
    os.makedirs(skill_folder, exist_ok=True)
    
    skill_file_path = os.path.join(skill_folder, "SKILL.md")
    
    # Determine type for description
    desc_type = "Process/Note"
    if "course" in filename.lower(): desc_type = "Course Material"
    elif "template" in filename.lower(): desc_type = "Template"
    elif "playbook" in filename.lower(): desc_type = "Sales Playbook"
    elif ext == ".skill": desc_type = "Pre-existing Skill"
    
    # Write the SKILL.md file conforming to Agent Customizations format
    skill_content = f"""---
name: {skill_name}
description: {desc_type} derived from {filename}
source_path: {filepath}
---

# {filename}

## Context
This skill provides knowledge, processes, and instructions derived from the document: `{filename}`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{content}
"""
    with open(skill_file_path, "w") as sf:
        sf.write(skill_content)
        
    skills_index.append(f"- **{skill_name}** ({desc_type}): Derived from `{filename}`")

# Create a Master Index file
index_path = os.path.join(library_dir, "LIBRARY_INDEX.md")
with open(index_path, "w") as f:
    f.write("# Signal Master Skill Library\n\n")
    f.write("This library contains all processes, courses, notes, and templates from the Signal directory, converted into Agent Skills.\n\n")
    f.write("## Available Skills\n\n")
    f.write("\n".join(skills_index))

print(f"Successfully generated {len(skills_index)} agent skills in {library_dir}")
