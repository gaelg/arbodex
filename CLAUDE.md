# ARBODEX - Reprendre le travail

> **Fichier lu AUTOMATIQUEMENT au démarrage** par opencode.
> **RÈGLE** : Ce fichier = source unique de vérité. Toujours vérifier/mettre à jour après chaque modification.

---

## 🚀 DÉMARRAGE RAPIDE (faire IMMÉDIATEMENT au démarrage)

```bash
# 1. Vérifier que le CSV correspond à ce fichier
wc -l public/trees.csv                    # Doit être 143 (header + 142 data)
head -1 public/trees.csv | tr ';' '\n' | wc -l  # Doit être 18 colonnes

# 2. Vérifier si des messages en attente
tail -3 ~/.local/state/opencode/prompt-history.jsonl | jq -r '.input'

# 3. Vérifier taille DB (tokens)
ls -lh ~/.local/share/opencode/opencode.db
```

---

## 📊 ÉTAT ACTUEL (2026-05-02 23:30)

**CSV** : `public/trees.csv` = 142 essences, 18 colonnes  
**Dimensions** : 27/142 complétées (19%) ← **EN COURS**  
**Terminé** : ✅ Sésame (85/85 espèces traitées)  

### Colonnes CSV (18 total)
```
1. nom_commun
2. nom_scientifique  
3. stockage_carbone
4. resilience
5. impact_icu
6. biodiversite
7. qualite_air
8. potentiel_allergisant
9. ombrage_fort
10. rafraichissement_fort
11. biodiversite_service
12. type_racines
13. allergie_service
14. hauteur_min_m        ← EN COURS
15. hauteur_max_m        ← EN COURS
16. envergure_min_m      ← EN COURS
17. envergure_max_m      ← EN COURS
18. port                  ← EN COURS
```

---

## ✅ MÉTA-INSTRUCTIONS (à suivre à chaque session)

1. **Sauvegarde** : Mettre à jour `logs/COMMENT_REPRENDRE.md` après chaque étape (batch de 10 arbres)
2. **Pauses** : Vérifier `~/.local/state/opencode/prompt-history.jsonl` toutes les 10-15s
3. **Tokens** : Vérifier `~/.local/share/opencode/opencode.db` (~5.7MB actuellement)
4. **Cohérence** : Paysagistes HDF + Benelux (besoin initial - jamais oublier)
5. **Lots** : 10-15 arbres max par lot (temps < 15s par lot)
6. **Todos** : Maintenir la liste des tâches à jour (fichier todo actuel)
7. **Meta-awareness** : TOUJOURS vérifier si le message utilisateur contient une méta-instruction
8. **Better recovery** : Utiliser section "VÉRIFICATION RAPIDE" au démarrage
9. **Local temp dirs** : Utiliser `.opencode-tmp/` dans le projet (PAS `/tmp`)
10. **Package install** : Si un package Linux peut aider → demander → si pas de réponse en 1 min → continuer sans
11. **Time estimates** : Afficher estimation temps restant toutes les ~5 minutes

---

## ✅ CHECKLIST APRÈS CHAQUE BATCH (OBLIGATOIRE)

Après chaque batch de 10 arbres:
1. ✅ `logs/COMMENT_REPRENDRE.md` mis à jour (meta #1)
2. ✅ `prompt-history.jsonl` vérifié (meta #2)  
3. ✅ Progrès affiché (X/142 fait)
4. ✅ Temps estimé affiché (meta #11 - toutes les ~5 min)
5. ✅ Commit git si plusieurs batches faits

---

## 🎯 TÂCHES ACTUELLES

1. ✅ Mettre à jour session-timeline.md  
2. ✅ Compiler liste exhaustive essences HDF  
3. ✅ Créer fichier intermédiaire  
4. ✅ Consolider liste unique 250+ essences  
5. ✅ Fusionner CSV existant + nouvelles essences  
6. ✅ Ajouter colonnes: famille, origine  
7. ✅ Traiter données Arboclimat (9/68 espèces)  
8. ✅ **Télécharger Sésame Metz (85 espèces)**  
9. 🔄 **Compléter dimensions 142 essences (27/142 fait)** ← NEXT  
10. ⬚ Ajouter colonnes: type_sol, resistance_secheresse, services écosystémiques  

---

## 🎯 BESOIN INITIAL (jamais oublier)

**Qui** : Paysagistes pro | **Quoi** : Choisir arbres/arbustes  
**Où** : HDF + Benelux | **Critères** : Sol, climat, entretien, biodiversité, allergies  
**Sources** : Arboclimat (68 espèces), Sésame (85), Végébase (197k+ plantes)

---

## 📁 FICHIERS IMPORTANTS

- **CSV actuel** : `public/trees.csv` (142 essences, 18 colonnes)
- **Historique détaillé** : `logs/COMMENT_REPRENDRE.md` (ne pas modifier - historique complet)
- **Backup CSV** : `public/trees.csv.backup`
- **Temp dir** : `.opencode-tmp/` (dans le projet)

---

## 🚀 PROCHAINE ÉTAPE IMMÉDIATE

**Compléter dimensions 142 essences** (hauteur, envergure, port)

```bash
# Voir arbres restants (sans dimensions)
grep ";;;" public/trees.csv | head -10

# Méthode de travail:
# 1. Prendre 10 arbres à la fois
# 2. Rechercher dimensions web (hauteur, envergure, port)
# 3. Mettre à jour CSV avec Python
# 4. Commiter + mettre à jour logs/COMMENT_REPRENDRE.md
# 5. Répéter jusqu'à 142/142
```

---

## 💾 COMMANDES RAPIDES

```bash
# Vérifier taille DB (tokens)
ls -lh ~/.local/share/opencode/opencode.db

# Vérifier messages en attente
tail -3 ~/.local/state/opencode/prompt-history.jsonl | jq -r '.input'

# Voir état actuel détaillé
cat logs/COMMENT_REPRENDRE.md

# Voir progression dimensions
grep -c ";;;" public/trees.csv  # Arbres restants
```
