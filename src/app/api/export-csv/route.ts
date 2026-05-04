import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    // Exporter depuis SQLite vers CSV avec ; comme séparateur
    const sql = `SELECT * FROM arbres;`;
    const output = execSync(`sqlite3 trees.db "${sql}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    // Convertir le format SQLite (pipe-separated) vers CSV (semicolon-separated)
    const lines = output.trim().split('\n').filter(Boolean);
    if (lines.length === 0) {
      return new NextResponse('Aucune donnée', { status: 404 });
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

    // Construire le CSV
    const csvLines = [
      columns.join(';'),
      ...lines.map((line) =>
        line
          .split('|')
          .map((cell) => {
            // Échapper les guillemets et entourer de guillemets si nécessaire
            if (cell.includes(';') || cell.includes('"') || cell.includes('\n')) {
              return '"' + cell.replace(/"/g, '""') + '"';
            }
            return cell;
          })
          .join(';')
      ),
    ];

    const csv = csvLines.join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="arbres-export.csv"',
      },
    });
  } catch (error: any) {
    console.error('Erreur export CSV:', error);
    return NextResponse.json(
      { error: 'Erreur export CSV' },
      { status: 500 }
    );
  }
}
