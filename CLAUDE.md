# ARBODEX - Instructions de reprise

Ce fichier contient l'état exact de la session au moment de la fermeture.

---

## 🚀 SESSION EN COURS (2026-05-04 08:37)

**État d'ensemble :** Débugage prod en cours, version dynamique pas encore visible.

### ✅ RÉALISÉ AUJOURD'HUI
1. **51 tests de non-régression** passent ✅
2. **Corrections bugs MVP** : CSV parsing (;), accents (bonne→bonne, moyenne→moyenne), champs alignés sur CSV ✅
3. **Version dynamique** : `package.json` → script `inject-version.js` → `src/version.ts` ✅
4. **Factorisation** : `Header.tsx`, `Footer.tsx` extraits ✅
5. **Refonte encapsulation filtres** : `src/lib/filters/` (types, registry, appliers) ✅
6. **Retrait temporaire des emojis** ✅
7. **Logique "presque local"** : distance HDF < 700km via haversine dans `appiers.ts` ✅
8. **CI stable** : "Fix formatage appiers.ts" a réussi ✅
9. **Icône Pokéball** : SVG créé (haut vert #2E7D32, bas blanc #FFF, centre gris #A0A0A0) ✅
10. **Nettoyage public/** : suppression fichiers test/temporaires ✅

### ⚠️ PROBLÈMES NON RÉSOLUS (PRIORITAIRES)
1. **Version affichée** : Toujours "v0.1.0" en prod (https://arbodex.vercel.app)
   - `src/version.ts` généré par script mais pas tracké par Git
   - **Solution** : ajouter `!src/version.ts` dans `.gitignore` ou changer l'approche

2. **Icône Pokéball** : À vérifier en prod (https://arbodex.vercel.app)
   - Dernière version : commit `ec8f49e` (Pokéball classique : haut vert, bas blanc, bouton gris)
   - Fichiers : `icon.svg`, `icon-192.png`, `icon-512.png`

3. **CI/CD** : Dernier push `500d8d0` (nettoyage) réussi ✅

### 📋 RESTE À FAIRE (PRIORITÉ)
1. **Corriger version affichée** : `src/version.ts` doit être soit commité, soit généré différemment
2. **Vérifier en prod** : Icône Pokéball + version (https://arbodex.vercel.app)
3. **Photos fiables** : Ajouter champs `image_port`, `image_fleurs`, `image_fruits` dans `Arbre`
4. **Choisir nouveaux emojis** : Avec sélection pour chaque (quand on les remettra)
5. **SonarJS** : Analyse qualité (plus tard)

### 🔧 FICHIERS CLÉS À REPRENDRE
- `src/lib/filters/` : Nouvelle structure encapsulée (types, registry, appliers) ✅
- `src/components/Header.tsx` : Factorisé ✅
- `src/components/Footer.tsx` : Factorisé ✅
- `src/lib/trees.ts` : Interface `Arbre` avec `regions_natives?` et `image_*` ✅
- `public/icon.svg` : Pokéball verte (haut #2E7D32, bas #FFF, centre #A0A0A0) ✅
- `src/version.ts` : **Non tracké** (généré au build) ⚠️

### 🎯 COMMANDES DE REPRISE
```bash
cd /home/gael/workspace/arbodex

# 1. Vérifier état
git status
npm test -- --run  # 51 tests doivent passer
npm run build  # Doit réussir

# 2. Corriger version affichée
# Soit ajouter dans .gitignore avec !src/version.ts
# Soit changer l'approche (ex: injection via variable d'environnement)

# 3. Vérifier prod
curl -s https://arbodex.vercel.app | grep -o 'Arbodex v[0-9.]*'
```

---

## 📊 TÂCHES UTILISATEUR (À VÉRIFIER EN PROD)
1. **Icône** : https://arbodex.vercel.app — Pokéball (haut vert, bas blanc, centre gris) ?
2. **Version** : https://arbodex.vercel.app — Doit afficher "v0.2.0" (pas v0.1.0) ?
3. **Filtres** : Tous fonctionnels avec nouvelle structure encapsulée ?

---

## 🚀 MÉTA-INSTRUCTIONS (TOUJOURS VALEURS)
- **Visibilité** : Ne jamais rester silencieux > 30s
- **Tokens** : Surveiller `~/.local/share/opencode/opencode.db`
- **Cohérence** : Paysagistes HDF + Benelux (besoin initial)
- **Savegarde** : `.opencode/logs/COMMENT_REPRENDRE.md` à jour
