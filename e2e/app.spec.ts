import { test, expect } from "@playwright/test";

test("la page charge et affiche le titre", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Arbodex|arbres|essences/i);
});

test("compte le nombre d'essences dans l'entête", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header p")).toContainText("essences");
});

test("la liste d'arbres s'affiche après chargement", async ({ page }) => {
  await page.goto("/");
  // Wait for the async CSV data to load and tree cards to appear
  const treeCards = page.locator("#liste-arbres [role='button']");
  await expect(treeCards.first()).toBeVisible({ timeout: 15000 });
  // Verify at least some cards rendered
  const count = await treeCards.count();
  expect(count).toBeGreaterThan(0);
});

test("la recherche textuelle par 'Chêne' filtre les résultats", async ({
  page,
}) => {
  await page.goto("/");
  // Wait for tree cards first
  await expect(
    page.locator("#liste-arbres [role='button']").first()
  ).toBeVisible({ timeout: 15000 });
  // Type in search
  await page.fill("#recherche", "Chêne");
  await page.waitForTimeout(500);
  // All visible tree card h3s should contain "Chêne"
  const cards = page.locator("#liste-arbres h3");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i)).toContainText("Chêne");
  }
});

test("le détail développé affiche Famille et Origine", async ({ page }) => {
  await page.goto("/");
  // Wait for tree cards
  await expect(
    page.locator("#liste-arbres [role='button']").first()
  ).toBeVisible({ timeout: 15000 });
  // Click first tree card to expand
  await page.locator("#liste-arbres [role='button']").first().click();
  // Check detail fields appear
  await expect(page.locator("#liste-arbres")).toContainText("Famille :");
  await expect(page.locator("#liste-arbres")).toContainText("Origine :");
});

test("le filtre Sol : décoché réduit le nombre d'essences", async ({
  page,
}) => {
  await page.goto("/");
  // Wait for tree data
  await expect(
    page.locator("#liste-arbres [role='button']").first()
  ).toBeVisible({ timeout: 15000 });

  // Get initial count
  const countText = page.locator("#liste-arbres p").first();
  const beforeText = await countText.textContent();
  const before = Number(beforeText?.split(" ")[0]);

  // Open Sols section
  await page.locator("button:has(h3:text('Sols'))").first().click();
  // Wait for section content
  await expect(page.locator('input[type="checkbox"]').first()).toBeVisible({
    timeout: 5000,
  });
  // Uncheck first checkbox
  await page.locator('input[type="checkbox"]').first().uncheck();
  await page.waitForTimeout(500);

  // Get updated count
  const afterText = await countText.textContent();
  const after = Number(afterText?.split(" ")[0]);
  expect(after).toBeLessThan(before);
});

test("le filtre Climat (exposition vent) fonctionne", async ({ page }) => {
  await page.goto("/");
  // Wait for tree data
  await expect(
    page.locator("#liste-arbres [role='button']").first()
  ).toBeVisible({ timeout: 15000 });

  // Open Climat section
  await page.locator("button:has(h3:text('Climat'))").first().click();
  // Wait for buttons with "Forte" text
  await expect(page.locator("button:has-text('Forte')").first()).toBeVisible({
    timeout: 5000,
  });
  // Click the "Forte" button for resistance_vent
  await page.locator("button:has-text('Forte')").first().click();
  await page.waitForTimeout(500);

  // Verify count is still positive
  const countText = page.locator("#liste-arbres p").first();
  const text = await countText.textContent();
  const count = Number(text?.split(" ")[0]);
  expect(count).toBeGreaterThan(0);
});

test("le filtre Origine (select) affiche des options non vides", async ({
  page,
}) => {
  await page.goto("/");
  // Wait for tree data
  await expect(
    page.locator("#liste-arbres [role='button']").first()
  ).toBeVisible({ timeout: 15000 });

  // Open Demandes particulières section
  await page
    .locator("button:has(h3:text('Demandes particulières'))")
    .first()
    .click();
  // Wait for select element
  const select = page.locator("select").first();
  await expect(select).toBeVisible({ timeout: 5000 });
  const options = await select.locator("option").allTextContents();
  const hasNumbers = options.some((o) => /\d+/.test(o));
  expect(hasNumbers).toBeTruthy();
});
