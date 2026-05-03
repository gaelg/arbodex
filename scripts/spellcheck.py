#!/usr/bin/env python3
"""
Vérification orthographe systématique avant push.
Usage: python3 scripts/spellcheck.py
"""

import os
import re
import sys
from pathlib import Path

# Fautes connues à corriger (sans accent là où il faut, typos)
TYPO_MAP = {
    "hete": "hêtre",
    "forrest": "forest",  # mais "forrestières" → "forestières"
    "nettoyage": "nettoyage",
    "filtre": "filtre",  # variable de code, acceptable
    "effectu": "effectué",  # participe passé
}

def check_file(filepath: Path) -> list:
    """Retourne la liste des fautes trouvées dans un fichier."""
    fautes = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            for wrong, correct in TYPO_MAP.items():
                if wrong in content.lower() and wrong != correct:
                    # Éviter les faux positifs (mots anglais, variables de code)
                    if wrong == "filtre" and "filtre" in filepath.name:
                        continue  # C'est une variable de code
                    fautes.append((filepath, wrong, correct))
    except Exception as e:
        pass
    return fautes

def main():
    base = Path(__file__).parent.parent
    files_to_check = []
    
    # Fichiers sources
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
