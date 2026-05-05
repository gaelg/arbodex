#!/usr/bin/env node
/**
 * Test post-déploiement : vérifie les textes affichés en prod
 * Usage: node scripts/post-deploy-check.js
 */

const https = require("https");

const URL = "https://arbodex.vercel.app";

// Textes qui doivent être présents (corrections récentes)
const TEXTES_ETALIS = [
  "Chêne pédonculé", // accent correct
  "Modéré", // coût au masculin
  "Régulière", // accent correct
  "Bonne", // résistance sécheresse
  "Local", // origine
  "Vraiment exotique", // origine
];

// Textes qui NE doivent PAS être présents
const TEXTES_ABSENTS = [
  "modereee", // typo corrigée
  "moderee", // ancienne valeur
  "Chene pedoncule", // sans accent
  "Reguliere", // sans accent
  "(espace)", // bug d'affichage
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function main() {
  console.log(`Vérification de ${URL}...\n`);

  const html = await fetchPage(URL);
  let ok = true;

  console.log("✅ Textes attendus :");
  for (const texte of TEXTES_ETALIS) {
    if (html.includes(texte)) {
      console.log(`  ✓ "${texte}"`);
    } else {
      console.log(`  ✗ "${texte}" MANQUANT`);
      ok = false;
    }
  }

  console.log("\n❌ Textes absents :");
  for (const texte of TEXTES_ABSENTS) {
    if (!html.includes(texte)) {
      console.log(`  ✓ "${texte}" absent (OK)`);
    } else {
      console.log(`  ✗ "${texte}" ENCORE PRÉSENT`);
      ok = false;
    }
  }

  console.log(
    "\n" + (ok ? "✅ TOUS LES TESTS PASSENT" : "❌ CERTAINS TESTS ÉCHOUENT")
  );
  process.exit(ok ? 0 : 1);
}

main();
