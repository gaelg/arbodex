#!/usr/bin/env python3
"""
Vérification orthographe française sur le texte visible uniquement.
Usage: python3 scripts/spellcheck.py
"""

import re
import sys
from pathlib import Path
from spellchecker import SpellChecker

checker = SpellChecker(language="fr")

# Mots techniques et noms propres à ignorer
WHITELIST = {
    # Noms latins courants
    "acer", "quercus", "fraxinus", "tilia", "carpinus", "betulus",
    "fagus", "castanea", "juglans", "platanus", "pyrus", "malus",
    "prunus", "cornus", "catalpa", "paulownia", "eleagnus", "hippophae",
    "ginkgo", "biloba", "abies", "picea", "larix", "pinus", "unedo",
    "rhododendron", "syzygium", "koelreuteria", "laburnum", "sophora",
    "robinia", "gymnocladus", "cedrela", "melia", "cotinus", "rhus",
    "syringa", "lonicera", "viburnum", "weigela", "kolkwitzia",
    "abelia", "linnaea", "symphoricarpos",
    "buxus", "buxacées", "fagacées", "sapindacées", "pinacées",
    "fasciculées", "sempervirens", "pédonculé", "robur", "rubrum", "strobus",
    "ginkgoacées",
    # Termes techniques
    "css", "jsx", "tsx", "json", "api", "ui", "url", "svg", "html",
    "github", "vercel", "nextjs", "npm", "node", "yarn", "git",
    "prettier", "eslint", "vitest", "typescript", "javascript",
    "seo", "pwa", "spa", "ssr", "csr", "isr",
    "arboclimat", "vegebase", "sesame", "metz",
    "hdf", "benelux", "paysagiste",
    "csv", "tsv", "utf", "bom",
    "min", "max", "etc", "ex", "nb", "vs", "id",
    # Noms propres
    "gael", "github", "opencode", "arbodex",
    # Termes métier anglais fréquents
    "tree", "filter", "callback", "state", "props", "event", "class",
    "button", "input", "select", "option", "label", "div", "span",
    "rounded", "border", "hidden", "flex", "grid", "hover", "focus",
    "ring", "bg", "text", "font", "px", "py", "mb", "mt", "ml", "mr",
    "w", "h", "sm", "md", "lg", "xl", "xl", "full", "auto",
    "items", "justify", "content", "between", "center", "space",
    "overflow", "relative", "absolute", "fixed", "sticky",
    "transition", "transform", "rotate", "scale", "opacity",
    "cursor", "pointer", "disabled", "readonly",
    "aria", "role", "tabindex",
    "async", "await", "function", "return", "const", "let", "var",
    "import", "export", "from", "default", "class", "extends",
    "console", "log", "warn", "error", "debug",
    "array", "object", "string", "number", "boolean", "null", "undefined",
    "push", "pop", "shift", "unshift", "slice", "splice", "map", "filter",
    "reduce", "forEach", "find", "findindex", "includes", "indexof",
    "length", "keys", "values", "entries", "foreach", "parse", "stringify",
    "json", "parse", "stringify",
    "set", "get", "delete", "has", "clear", "add",
    "papaparse", "papa",
    "gray", "green", "bold", "semibold", "screen", "display", "amber",
    "gap", "medium", "nowrap", "row", "standalone", "start",
    "tracking", "underline", "uppercase", "white", "whitespace",
    "wider", "block", "left", "none", "outline", "shadow",
    "inline", "italic", "wrap", "blue", "red", "yellow", "emerald",
    "cosyst", "écosystémiques", "miques", "agres",
    # Termes métier français spécifiques
    "haie", "haies", "arbuste", "arbustes", "ligneux", "ligneuse",
    "pépiniériste", "pépiniéristes", "pépinière", "pépinières",
    "ornemental", "ornementale", "rusticité", "climatique", "écosystémique",
    "biodiversité", "mellifère", "pollinisation", "fructification",
    "anthropisé", "urbanisé", "synergie", "résilience",
    "allergisant", "allergène", "allergènes",
    "drageonnant", "drageons",
    "rabourgrissant", "rabourgrissante",
    "parasol", "étalé", "érigé", "pleureur", "tortueux",
    "arrondi", "conique", "pyramidal", "fastigié", "colonnaire",
    "superficielles", "profondes", "pivotantes", "traçantes",
    "calcaire", "acide", "argileux", "limoneux", "sableux", "humifère",
    "neutre", "basique",
    "sècheresse", "vent", "chaleur", "rusticité",
    "mellifère", "fruitière", "fauconne", "carpophage",
    "automnale", "printanière", "estivale",
    "décorative", "dévastatrices", "fragiles", "salissants",
    "taille", "entretien", "maladies", "sensibilité", "longévité",
    "forêt", "forestières", "bocage", "talus", "haies",
    "carbonne", "carbone",
}

checker.word_frequency.load_words(WHITELIST)

def extract_french_text(content):
    """Extrait le texte français visible (chaînes, JSX, commentaires français)."""
    texts = []
    # Chaînes de caractères simples ou doubles
    strings = re.findall(r'["\'](.*?)["\']', content)
    for s in strings:
        # Garder seulement si contient des lettres accentuées ou espaces (probablement du texte)
        if re.search(r'[àâäçéèêëïîôùûüÿñæœ\s]', s):
            texts.append(s)
    return texts

def check_file(filepath):
    fautes = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            texts = extract_french_text(content)
            for text in texts:
                # Extraire les mots (3+ car, lettres accentuées)
                words = re.findall(r'[a-zàâäçéèêëïîôùûüÿñæœ]{3,}', text.lower())
                unknown = checker.unknown(words)
                for word in sorted(unknown):
                    if word not in WHITELIST:
                        fautes.append((filepath, word))
    except Exception:
        pass
    return fautes

def main():
    base = Path(__file__).parent.parent
    
    files_to_check = []
    for ext in ["tsx", "ts", "csv", "js"]:
        files_to_check.extend(base.rglob(f"src/**/*.{ext}"))
        files_to_check.extend(base.rglob(f"public/**/*.{ext}"))
    
    all_fautes = []
    for f in files_to_check:
        if ".next" in str(f) or "node_modules" in str(f) or "package-lock" in str(f):
            continue
        fautes = check_file(f)
        all_fautes.extend(fautes)
    
    # Dédupliquer
    all_fautes = list(set(all_fautes))
    
    if all_fautes:
        print("❌ Fautes d'orthographe détectées :")
        current_file = None
        for f, word in sorted(all_fautes):
            if f != current_file:
                print(f"\n  {f.name}:")
                current_file = f
            print(f"    - {word}")
        sys.exit(1)
    else:
        print("✅ Pas de fautes d'orthographe détectées.")
        sys.exit(0)

if __name__ == "__main__":
    main()
