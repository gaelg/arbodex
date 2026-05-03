#!/usr/bin/env python3
"""
Script de validation : compare les options de filtres UI avec les valeurs réelles du CSV
Usage: python3 scripts/validate_filters.py
"""

import csv
import sys
from pathlib import Path

# Configuration des filtres UI (hardcodés dans FilterForm.tsx)
UI_FILTERS = {
    "origine": ["local", "presque_local", "vraiment_exotique"],
    "adapte_changement_climatique": ["oui", "non"],
    "mellifere": ["oui", "non"],
    "fruitiere_sauvage": ["oui", "non"],
    "floraison_remarquable": ["oui", "non"],
    "couleur_automnale": ["oui", "non"],
    "pollen_allergisant": ["faible", "moyen", "fort"],
    "fruits_salissants": ["oui", "non"],
    "branches_fragiles": ["oui", "non"],
    "racines_devastatrices": ["oui", "non"],
    "frequence_taille": ["jamais", "occasionnelle", "reguliere"],
    "sensibilite_maladies": ["faible", "moderee", "elevee"],
    "cout_entretien": ["faible", "modere", "eleve"],
}

def get_csv_values(csv_path: str, column: str) -> set:
    """Récupère les valeurs uniques d'une colonne CSV"""
    values = set()
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=';')
        for row in reader:
            val = row.get(column, '').strip()
            if val:
                values.add(val)
    return values

def validate_filters():
    csv_path = Path(__file__).parent.parent / "public" / "trees.csv"
    
    if not csv_path.exists():
        print(f"❌ CSV non trouvé: {csv_path}")
        sys.exit(1)
    
    errors = []
    warnings = []
    
    print("🔍 Validation des filtres UI vs valeurs CSV...\n")
    
    for filter_key, ui_options in UI_FILTERS.items():
        csv_column = filter_key
        ui_set = set(ui_options)
        
        try:
            csv_values = get_csv_values(str(csv_path), csv_column)
            
            # Valeurs CSV manquantes dans l'UI
            missing_in_ui = sorted(csv_values - ui_set)
            if missing_in_ui:
                errors.append(f"❌ {filter_key}: Valeurs CSV absents de l'UI: {missing_in_ui}")
            
            # Options UI non présentes dans le CSV
            extra_in_ui = sorted(ui_set - csv_values)
            if extra_in_ui:
                warnings.append(f"⚠️  {filter_key}: Options UI inutilisées: {extra_in_ui}")
            
            if not missing_in_ui and not extra_in_ui:
                print(f"✅ {filter_key}: OK")
        except Exception as e:
            warnings.append(f"⚠️  {filter_key}: Erreur: {e}")
    
    print("\n" + "=" * 50)
    
    if errors:
        print("\n🐛 ERREURS (valeurs CSV manquantes dans l'UI):")
        for e in errors:
            print(e)
    
    if warnings:
        print("\n⚠️  AVERTISSEMENTS:")
        for w in warnings:
            print(w)
    
    if not errors and not warnings:
        print("\n✅ Tous les filtres sont cohérents !")
    
    print("\n" + "=" * 50)
    
    # Afficher un résumé des valeurs uniques par colonne
    print("\n📊 Résumé des valeurs uniques dans le CSV:")
    columns_to_check = [
        "origine", "type", "type_sol", "resistance_secheresse", "pH",
        "adapte_changement_climatique", "mellifere", "pollen_allergisant",
        "frequence_taille", "sensibilite_maladies", "cout_entretien"
    ]
    
    for col in columns_to_check:
        try:
            values = get_csv_values(str(csv_path), col)
            print(f"  {col}: {sorted(values)}")
        except:
            pass
    
    sys.exit(1 if errors else 0)

if __name__ == "__main__":
    validate_filters()
