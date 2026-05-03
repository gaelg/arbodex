#!/usr/bin/env python3
"""
Vérification orthographe systématique.
Usage: python3 scripts/spellcheck.py
"""

import os
import sys
from pathlib import Path

TYPO_MAP = {
    "hete": "hêtre",
    "forrest": "forest",
    "nettoyage": "nettoyage",
}

def check_file(filepath):
    fautes = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().lower()
            for wrong, correct in TYPO_MAP.items():
                if wrong in content:
                    fautes.append((filepath, wrong, correct))
    except Exception:
        pass
    return fautes

def main():
    base = Path(__file__).parent.parent
    files_to_check = []
    
    for ext in ["tsx", "ts", "ts", "md", "csv"]:
        files_to_check.extend(base.rglob(f"src/**/*.{ext}"))
        files_to_check.extend(base.rglob(f"*.{ext}"))
    
    all_fautes = []
    for f in files_to_check:
        if ".next" in str(f) or "node_modules" in str(f):
            continue
        fautes = check_file(f)
        all_fautes.extend(fautes)
    
    if all_fautes:
        print("❌ Fautes d'orthographe détectées :")
        for f, wrong, correct in all_fautes:
            print(f"  {f}: '{wrong}' → '{correct}'")
        sys.exit(1)
    else:
        print("✅ Pas de fautes d'orthographe détectées.")
        sys.exit(0)

if __name__ == "__main__":
    main()
