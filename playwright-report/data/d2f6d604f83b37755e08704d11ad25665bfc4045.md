# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: workflows.spec.ts >> Lab workflows >> lab page renders with KPI stats
- Location: e2e/workflows.spec.ts:375:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Laboratory"
Received string:    "Something went wrong"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('h1')
    24 × locator resolved to <h1 class="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
       - unexpected value "Something went wrong"

```

```yaml
- heading "Something went wrong" [level=1]
```

# Test source

```ts
  278 |       await expect(page.locator("h1")).toContainText("Appointments");
  279 |     }
  280 |     if (await allTab.isVisible()) {
  281 |       await allTab.click();
  282 |       await expect(page.locator("h1")).toContainText("Appointments");
  283 |     }
  284 |   });
  285 | 
  286 |   test("mini calendar renders and is interactive", async ({ page }) => {
  287 |     await page.goto("/appointments");
  288 |     await page.waitForLoadState("networkidle");
  289 |     const calendar = page.locator("[data-testid='appt-calendar']").or(page.locator("text=June 2026").or(page.locator("text=May 2026")));
  290 |     await expect(calendar).toBeVisible({ timeout: 10000 });
  291 |   });
  292 | 
  293 |   test("appointment rows exist", async ({ page }) => {
  294 |     await page.goto("/appointments");
  295 |     await page.waitForLoadState("networkidle");
  296 |     await page.waitForTimeout(1000);
  297 |     const rows = page.locator("table tbody tr");
  298 |     const count = await rows.count();
  299 |     expect(count).toBeGreaterThanOrEqual(1);
  300 |   });
  301 | 
  302 |   test("new appointment button exists", async ({ page }) => {
  303 |     const newBtn = page.locator("button:has-text('New Appointment')").first();
  304 |     await expect(newBtn).toBeVisible();
  305 |   });
  306 | });
  307 | 
  308 | // ── 5. BILLING WORKFLOW ────────────────────────────────────────────────────────
  309 | 
  310 | test.describe("Billing workflows", () => {
  311 |   test.beforeEach(async ({ page }) => {
  312 |     await loginAsDoctor(page);
  313 |   });
  314 | 
  315 |   test("billing page renders with KPI stats", async ({ page }) => {
  316 |     await page.goto("/billing");
  317 |     await page.waitForLoadState("networkidle");
  318 |     await expect(page.locator("h1")).toContainText("Billing", { timeout: 10000 });
  319 |     await expect(page.locator("text=Total Collected").or(page.locator("text=Outstanding Due"))).toBeVisible({ timeout: 10000 });
  320 |   });
  321 | 
  322 |   test("search filters bills", async ({ page }) => {
  323 |     await page.goto("/billing");
  324 |     await page.waitForLoadState("networkidle");
  325 |     const searchInput = page.locator('[data-testid="billing-search"]').or(page.locator('main >> input[placeholder="Search patient, UHID, ABHA\"]')).first();
  326 |     await searchInput.fill("BILL");
  327 |     await page.waitForTimeout(300);
  328 |     const rows = page.locator("table tbody tr");
  329 |     const count = await rows.count();
  330 |     expect(count).toBeGreaterThanOrEqual(1);
  331 |   });
  332 | 
  333 |   test("filter drawer opens for billing filters", async ({ page }) => {
  334 |     await page.goto("/billing");
  335 |     await page.waitForLoadState("networkidle");
  336 |     const filterBtn = page.locator('[data-testid="billing-filter"]').or(page.locator('main >> button:has-text("Filter")')).first();
  337 |     if (await filterBtn.isVisible()) {
  338 |       await filterBtn.click();
  339 |       await expect(page.locator("text=Status").or(page.locator("text=Category"))).toBeVisible({ timeout: 100000 });
  340 |     }
  341 |   });
  342 | });
  343 | 
  344 | // ── 6. PHARMACY WORKFLOW ───────────────────────────────────────────────────────
  345 | 
  346 | test.describe("Pharmacy workflows", () => {
  347 |   test.beforeEach(async ({ page }) => {
  348 |     await loginAsDoctor(page);
  349 |     await page.goto("/pharmacy");
  350 |   });
  351 | 
  352 |   test("pharmacy page renders with KPI stats", async ({ page }) => {
  353 |     await expect(page.locator("h1")).toContainText("Pharmacy", { timeout: 5000 });
  354 |   });
  355 | 
  356 |   test("search filters prescriptions", async ({ page }) => {
  357 |     const searchInput = page.locator('main >> input[placeholder*="Rx ID"]').first();
  358 |     await searchInput.fill("RX");
  359 |     await page.waitForTimeout(300);
  360 |     await expect(page.locator("body")).toBeVisible();
  361 |   });
  362 | 
  363 |   test("stock alerts section renders", async ({ page }) => {
  364 |     await expect(page.locator("text=Stock Alerts").or(page.locator("text=Reorder"))).toBeVisible();
  365 |   });
  366 | });
  367 | 
  368 | // ── 7. LAB WORKFLOW ────────────────────────────────────────────────────────────
  369 | 
  370 | test.describe("Lab workflows", () => {
  371 |   test.beforeEach(async ({ page }) => {
  372 |     await loginAsDoctor(page);
  373 |   });
  374 | 
  375 |   test("lab page renders with KPI stats", async ({ page }) => {
  376 |     await page.goto("/lab");
  377 |     await page.waitForLoadState("networkidle");
> 378 |     await expect(page.locator("h1")).toContainText("Laboratory", { timeout: 10000 });
      |                                      ^ Error: expect(locator).toContainText(expected) failed
  379 |   });
  380 | 
  381 |   test("department filter pills exist and are clickable", async ({ page }) => {
  382 |     await page.goto("/lab");
  383 |     await page.waitForLoadState("networkidle");
  384 |     const deptPills = page.locator("[data-testid='lab-dept-all']").or(page.locator("button:has-text('All')")).first();
  385 |     if (await deptPills.isVisible()) {
  386 |       await deptPills.click();
  387 |       await expect(page.locator("body")).toBeVisible();
  388 |     }
  389 |   });
  390 | 
  391 |   test("lab orders are displayed", async ({ page }) => {
  392 |     await page.goto("/lab");
  393 |     await page.waitForLoadState("networkidle");
  394 |     const rows = page.locator("table tbody tr");
  395 |     const count = await rows.count();
  396 |     expect(count).toBeGreaterThanOrEqual(0);
  397 |   });
  398 | });
  399 | 
  400 | // ── 8. INVENTORY WORKFLOW ──────────────────────────────────────────────────────
  401 | 
  402 | test.describe("Inventory workflows", () => {
  403 |   test.beforeEach(async ({ page }) => {
  404 |     await loginAsDoctor(page);
  405 |   });
  406 | 
  407 |   test("inventory page renders with item table", async ({ page }) => {
  408 |     await page.goto("/inventory");
  409 |     await page.waitForLoadState("networkidle");
  410 |     await expect(page.locator("h1")).toContainText("Inventory", { timeout: 10000 });
  411 |     const rows = page.locator("table tbody tr");
  412 |     const count = await rows.count();
  413 |     expect(count).toBeGreaterThanOrEqual(1);
  414 |   });
  415 | 
  416 |   test("low stock alert banner displays when items below reorder", async ({ page }) => {
  417 |     await page.goto("/inventory");
  418 |     await page.waitForLoadState("networkidle");
  419 |     const banner = page.locator("text=below reorder level");
  420 |     const count = await banner.count();
  421 |     expect(count).toBeGreaterThanOrEqual(0);
  422 |   });
  423 | 
  424 |   test("search filters inventory by item name", async ({ page }) => {
  425 |     await page.goto("/inventory");
  426 |     await page.waitForLoadState("networkidle");
  427 |     const searchInput = page.locator('[data-testid="inventory-search"]').or(page.locator('main >> input[placeholder="Search items..."]')).first();
  428 |     await searchInput.fill("Glove");
  429 |     await page.waitForTimeout(300);
  430 |     const rows = page.locator("table tbody tr");
  431 |     if (await rows.first().isVisible()) {
  432 |       await expect(rows.first()).toContainText("Glove");
  433 |     }
  434 |   });
  435 | 
  436 |   test("department dropdown filters inventory", async ({ page }) => {
  437 |     await page.goto("/inventory");
  438 |     await page.waitForLoadState("networkidle");
  439 |     const deptSelect = page.locator('[data-testid="inventory-dept"]').or(page.locator("select")).first();
  440 |     const options = await deptSelect.locator("option").allTextContents();
  441 |     expect(options.length).toBeGreaterThanOrEqual(2);
  442 |   });
  443 | 
  444 |   test("restock button is clickable on inventory items", async ({ page }) => {
  445 |     await page.goto("/inventory");
  446 |     await page.waitForLoadState("networkidle");
  447 |     const restockBtn = page.locator('[data-testid="inventory-restock"]').or(page.locator("button:has-text('Restock')")).first();
  448 |     if (await restockBtn.isVisible()) {
  449 |       await restockBtn.click();
  450 |     }
  451 |     await expect(page.locator("h1")).toContainText("Inventory");
  452 |   });
  453 | 
  454 |   test("decrement button is clickable on inventory items", async ({ page }) => {
  455 |     await page.goto("/inventory");
  456 |     await page.waitForLoadState("networkidle");
  457 |     const decBtn = page.locator('[data-testid="inventory-decrement"]').or(page.locator("button:has-text('−')")).first();
  458 |     if (await decBtn.isVisible()) {
  459 |       await decBtn.click();
  460 |     }
  461 |     await expect(page.locator("h1")).toContainText("Inventory");
  462 |   });
  463 | });
  464 | 
  465 | // ── 9. STAFF WORKFLOW ──────────────────────────────────────────────────────────
  466 | 
  467 | test.describe("Staff workflows", () => {
  468 |   test.beforeEach(async ({ page }) => {
  469 |     await loginAsDoctor(page);
  470 |     await page.goto("/staff");
  471 |   });
  472 | 
  473 |   test("staff page renders with directory table", async ({ page }) => {
  474 |     await expect(page.locator("h1")).toContainText("Staff", { timeout: 5000 });
  475 |     const rows = page.locator("table tbody tr");
  476 |     const count = await rows.count();
  477 |     expect(count).toBeGreaterThanOrEqual(1);
  478 |   });
```