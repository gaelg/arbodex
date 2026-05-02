# ARBODEX - Reprendre le travail

> **Fichier lu AUTOMATIQUEMENT au démarrage** par opencode.
> **RÈGLE** : Ce fichier = source unique de vérité. Toujours vérifier/mettre à jour après chaque modification.

---

## VÉRIFICATION RAPIDE (à faire au démarrage)

```bash
# Vérifier que le CSV correspond à ce fichier
wc -l public/trees.csv                    # Doit être 143 (header + 142 data)
head -1 public/trees.csv | tr ';' '\n' | wc -l  # Doit être 13 colonnes
```

---

## État actuel (2026-05-02 23:00)

**CSV** : `public/trees.csv` = 142 essences, 18 colonnes (13 remplies + 5 dimension vides)  
**Terminé** : ✅ Sésame (85/85 espèces traitées)  
**En cours** : 🔄 Ajout colonnes dimensions (hauteur, envergure, port)  
**Prochaine étape** : Compléter dimensions 142 essences → colonnes sol/climat → tester app

> **Historique détaillé** : `logs/COMMENT_REPRENDRE.md` (ne pas modifier - historique complet)

---

## Méta-instructions (à suivre à chaque session)

1. **Sauvegarde** : `logs/COMMENT_REPRENDRE.md` après chaque étape
2. **Pauses** : Toutes les 10-15s, vérifier `~/.local/state/opencode/prompt-history.jsonl`
3. **Tokens** : Checker `~/.local/share/opencode/opencode.db` (~4.4MB)
4. **Cohérence** : Paysagistes HDF + Benelux (besoin initial)
5. **Lots** : 10-15 éléments max par lot (10-15s)
6. **Todos** : Maintenir la liste des tâches à jour (tâche interrompue notée ici et dans todos)
7. **Meta-awareness** : Toujours vérifier si le message de l'utilisateur contient une méta-instruction
8. **Better recovery** : Ajouter sections de vérification pour éviter les désynchronisations
9. **Local temp dirs** : Utiliser `.opencode-tmp/` dans le projet, pas `/tmp`
10. **Package install** : Si un package Linux peut aider, demander; si pas de réponse en 1 min, continuer sans

---

## Todos actuelle

1. ✅ Mettre à jour session-timeline.md  
2. ✅ Compiler liste exhaustive essences HDF  
3. ✅ Créer fichier intermédiaire  
4. ✅ Consolider liste unique 250+ essences  
5. ✅ Fusionner CSV existant + nouvelles essences  
6. ✅ Ajouter colonnes: famille, origine  
7. ✅ Traiter données Arboclimat (9/68 espèces)  
8. ✅ **Télécharger Sésame Metz (85 espèces)**  
9. 🔄 **Compléter dimensions 142 essences** ← NEXT (hauteur, envergure, port)  
10. ⬚ Ajouter colonnes: type_sol, resistance_secheresse, services écosystémiques  

---

## Besoin initial (jamais oublier)

**Qui** : Paysagistes pro | **Quoi** : Choisir arbres/arbustes  
**Où** : HDF + Benelux | **Critères** : Sol, climat, entretien, biodiversité, allergies  
**Sources** : Arboclimat (68 espèces), Sésame (85), Végébase (197k+ plantes)

---

## Commandes rapides

```bash
# Vérifier taille DB (tokens)
ls -lh ~/.local/share/opencode/opencode.db

# Vérifier messages en attente
tail -3 ~/.local/state/opencode/prompt-history.jsonl | jq -r '.input'

# Voir état actuel
cat logs/COMMENT_REPRENDRE.md
```
