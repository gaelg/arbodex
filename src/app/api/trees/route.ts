import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    // Lire toutes les essences depuis SQLite
    const sql = 'SELECT * FROM arbres;';
    const output = execSync(`sqlite3 trees.db "${sql}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    // Parser la sortie SQLite (pipe-separated par défaut)
    const lines = output.trim().split('\n').filter(Boolean);
    if (lines.length === 0) {
      return NextResponse.json([]);
    }

    // Récupérer les colonnes
    const columnsOutput = execSync(
      `sqlite3 trees.db "PRAGMA table_info(arbres);"`,
      { cwd: process.cwd(), encoding: 'utf8' }
    );
    const columns = columnsOutput
      .trim()
      .split('\n')
      .map((line: string) => line.split('|')[1]); // cid|name|type|notnull|dflt_value|pk

    // Construire les objets avec conversion de types
    const numericFields = [
      'hauteur_min_m', 'hauteur_max_m', 'envergure_min_m', 'envergure_max_m',
      'rusticite_min_C', 'resistance_vent', 'resistance_chaleur_urbaine',
      'stockage_carbone', 'resilience', 'impact_icu', 'biodiversite', 'qualite_air'
    ];

    const arbres = lines.map((line: string) => {
      const values = line.split('|');
      const arbre: any = {};
      columns.forEach((col: string, i: number) => {
        const val = values[i] || '';
        // Convertir en nombre si champ numérique
        if (numericFields.includes(col) && val !== '') {
          arbre[col] = Number(val);
        } else {
          arbre[col] = val;
        }
      });
      return arbre;
    });

    return NextResponse.json(arbres);
  } catch (error: any) {
    console.error('Erreur lecture SQLite:', error);
    return NextResponse.json(
      { error: 'Erreur lecture données' },
      { status: 500 }
    );
  }
}
