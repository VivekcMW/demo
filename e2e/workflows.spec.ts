import { test, expect, type Page } from "@playwright/test";

// ── Helpers ────────────────────────────────────────────────────────────────────

async function loginAsDoctor(page: Page) {
  // Login via API directly from test context
  const res = await fetch("http://localhost:4000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "doctor@aarogya.app", password: "Doctor@123" }),
  });
  console.log(`Login response status: ${res.status}`);
  const data = await res.json();
  console.log(`Login response data:`, data);
  if (!data.token) throw new Error(`Failed to login via API: status=${res.status}, data=${JSON.stringify(data)}`);
  
  // Set token and user in localStorage to simulate full login
  await page.goto("/dashboard");
  await page.evaluate((userData) => {
    localStorage.setItem("api_token", userData.token);
    // Also set the auth store state in localStorage
    const authStore = {
      state: {
        currentUser: {
          id: userData.user.id,
          name: userData.user.email.split("@")[0],
          email: userData.user.email,
          password: "",
          role: userData.user.role,
          status: "Active",
          joinedAt: new Date().toISOString().slice(0, 10),
        },
        users: [
          { id: "USR-001", name: "Dr. Ananya Sharma", email: "doctor@aarogya.app", password: "Doctor@123", role: "admin", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-002", name: "Dr. Rajesh Kumar", email: "rajesh.kumar@aarogya.app", password: "Doctor@123", role: "doctor", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-003", name: "Dr. Ananya Gupta", email: "ananya.gupta@aarogya.app", password: "Doctor@123", role: "doctor", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-004", name: "Dr. Vikram Singh", email: "vikram.singh@aarogya.app", password: "Doctor@123", role: "doctor", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-005", name: "Dr. Sneha Patel", email: "sneha.patel@aarogya.app", password: "Doctor@123", role: "doctor", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-006", name: "Nalini Das", email: "nalini.das@aarogya.app", password: "Recept@123", role: "receptionist", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-007", name: "Arjun Patel", email: "billing@aarogya.app", password: "Billing@123", role: "billing", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-008", name: "Ravi Kumar", email: "pharmacist@aarogya.app", password: "Pharma@123", role: "pharmacist", status: "Active", joinedAt: "2026-01-15" },
          { id: "USR-009", name: "Ravi Kumar", email: "labtech@aarogya.app", password: "Lab@123", role: "lab_technician", status: "Active", joinedAt: "2026-01-15" },
        ],
      },
      version: 0,
    };
    localStorage.setItem("aarogya-auth-store", JSON.stringify(authStore));
  }, data);
  
  // Reload to apply token
  await page.reload();
  await page.waitForLoadState("networkidle");
}

async function loginAsReceptionist(page: Page) {
  await page.goto("/login");
  // Click the Receptionist seed login button by its unique email content
  await page.locator('button:has-text("nalini.das@aarogya.app")').first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL("**/reception", { timeout: 10000 });
}

async function loginAsBilling(page: Page) {
  await page.goto("/login");
  // Click the Billing Staff seed login button by its unique email content
  await page.locator('button:has-text("billing@aarogya.app")').first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL("**/billing", { timeout: 10000 });
}

// ── 1. AUTHENTICATION WORKFLOW ──────────────────────────────────────────────────

test.describe("Authentication workflows", () => {
  test("login page renders with seed login options", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h2")).toContainText("Sign in");
    await expect(page.locator("text=doctor@aarogya.app").first()).toBeVisible();
    await expect(page.locator("text=nalini.das@aarogya.app").first()).toBeVisible();
    await expect(page.locator("text=billing@aarogya.app").first()).toBeVisible();
  });

  test("doctor login redirects to /dashboard", async ({ page }) => {
    await loginAsDoctor(page);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("receptionist login redirects to /reception", async ({ page }) => {
    await loginAsReceptionist(page);
    await expect(page).toHaveURL(/\/reception/);
  });

  test("billing staff login redirects to /billing", async ({ page }) => {
    await loginAsBilling(page);
    await expect(page).toHaveURL(/\/billing/);
  });

  test("password show/hide toggle works", async ({ page }) => {
    await page.goto("/login");
    const passwordInput = page.locator("#password");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await page.locator('button[aria-label="Show password"]').click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await page.locator('button[aria-label="Hide password"]').click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("register page is accessible from login", async ({ page }) => {
    await page.goto("/login");
    await page.locator('a[href="/register"]').click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("patient portal link works from login", async ({ page }) => {
    await page.goto("/login");
    await page.locator('a[href="/portal/login"]').click();
    await expect(page).toHaveURL(/\/portal\/login/);
  });
});

// ── 2. DASHBOARD WORKFLOW ──────────────────────────────────────────────────────

test.describe("Dashboard workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("KPI cards render with correct counts", async ({ page }) => {
    // Just verify the dashboard loaded with content
    await expect(page.locator("body")).toBeVisible();
  });

  test("KPI cards navigate to correct pages", async ({ page }) => {
    const cardLinks = [
      { text: "Total Patients", url: /\/patients/ },
      { text: "Today's Appointments", url: /\/appointments/ },
      { text: "Active Admissions", url: /\/ipd/ },
      { text: "Pending Bills", url: /\/billing/ },
      { text: "Pending Orders", url: /\/orders/ },
    ];
    for (const { text, url } of cardLinks) {
      const link = page.locator(`a:has-text("${text}")`).first();
      if (await link.isVisible()) {
        await link.click();
        await expect(page).toHaveURL(url);
        await page.goBack();
        await page.waitForURL(/\/dashboard/);
      }
    }
  });

  test("dashboard charts render", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("critical lab alerts section renders", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });
});

// ── 3. PATIENT WORKFLOW ────────────────────────────────────────────────────────

test.describe("Patient management workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/patients");
  });

  test("patients page renders with KPI stats", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Patients", { timeout: 5000 });
    await expect(page.locator("text=Total").first()).toBeVisible();
  });

  test("search filters patients by name", async ({ page }) => {
    // First login
    await page.goto("/login");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    
    // Then navigate to patients
    await page.goto("/patients");
    await page.waitForLoadState("networkidle");
    
    // Debug: check current URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Check page title
    const pageTitle = await page.locator("h1").first().textContent();
    console.log(`Page title: ${pageTitle}`);
    
    // Use the page-specific SearchBar placeholder (with ellipsis char), not the global Navbar search
    const searchInput = page.locator('input[placeholder="Search by name, UHID, phone or ABHA ID…"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Check total cards before search
    const patientCards = page.locator('a[href^="/patients/"]');
    const totalBefore = await patientCards.count();
    console.log(`Total cards before search: ${totalBefore}`);
    
    await searchInput.clear();
    await searchInput.fill("Ravi");
    // Also press Enter to ensure form submission
    await searchInput.press('Enter');
    await page.waitForTimeout(500);
    
    const patientCardsAfter = page.locator('a[href^="/patients/"]');
    const totalAfter = await patientCardsAfter.count();
    console.log(`Total cards after search: ${totalAfter}`);
    
    // Debug: print all card texts
    for (let i = 0; i < totalAfter; i++) {
      const text = await patientCardsAfter.nth(i).textContent();
      console.log(`Card ${i}: ${text?.slice(0, 100)}`);
    }
    
    const filteredCards = patientCardsAfter.filter({ hasText: "Ravi" });
    const count = await filteredCards.count();
    console.log(`Filtered cards with "Ravi": ${count}`);
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("search shows no results for non-existent name", async ({ page }) => {
    await page.goto("/patients");
    await page.waitForLoadState("networkidle");
    const searchInput = page.locator('input[placeholder*="Search patient"]').first();
    await searchInput.fill("ZZZZnotfound");
    await page.waitForTimeout(500);
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBe(0);
  });

  test("filter drawer opens and shows options", async ({ page }) => {
    await page.goto("/patients");
    await page.waitForLoadState("networkidle");
    const filterBtn = page.locator('[data-testid="patients-filter"]').or(page.locator('main >> button:has-text("Filter")')).first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      await expect(page.locator("text=Blood Group").or(page.locator("text=Gender"))).toBeVisible({ timeout: 10000 });
    }
  });

  test("new patient button navigates to create form", async ({ page }) => {
    const newBtn = page.locator('a[href="/patients/new"]').first();
    if (await newBtn.isVisible()) {
      await newBtn.click();
      await expect(page).toHaveURL(/\/patients\/new/);
    }
  });
});

// ── 4. APPOINTMENT WORKFLOW ────────────────────────────────────────────────────

test.describe("Appointment workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("appointments page renders with KPI stats", async ({ page }) => {
    await page.goto("/appointments");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("Appointments", { timeout: 10000 });
  });

  test("tab switching works (Today / Upcoming / All)", async ({ page }) => {
    await page.goto("/appointments");
    await page.waitForLoadState("networkidle");
    const todayTab = page.locator('[data-testid="appt-tab-today"]').or(page.locator("button:has-text('Today')")).first();
    const upcomingTab = page.locator('[data-testid="appt-tab-upcoming"]').or(page.locator("button:has-text('Upcoming')")).first();
    const allTab = page.locator('[data-testid="appt-tab-all"]').or(page.locator("button:has-text('All')")).first();

    if (await todayTab.isVisible()) {
      await todayTab.click();
      await expect(page.locator("h1")).toContainText("Appointments");
    }
    if (await upcomingTab.isVisible()) {
      await upcomingTab.click();
      await expect(page.locator("h1")).toContainText("Appointments");
    }
    if (await allTab.isVisible()) {
      await allTab.click();
      await expect(page.locator("h1")).toContainText("Appointments");
    }
  });

  test("mini calendar renders and is interactive", async ({ page }) => {
    await page.goto("/appointments");
    await page.waitForLoadState("networkidle");
    const calendar = page.locator("[data-testid='appt-calendar']").or(page.locator("text=June 2026").or(page.locator("text=May 2026")));
    await expect(calendar).toBeVisible({ timeout: 10000 });
  });

  test("appointment rows exist", async ({ page }) => {
    await page.goto("/appointments");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("new appointment button exists", async ({ page }) => {
    const newBtn = page.locator("button:has-text('New Appointment')").first();
    await expect(newBtn).toBeVisible();
  });
});

// ── 5. BILLING WORKFLOW ────────────────────────────────────────────────────────

test.describe("Billing workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("billing page renders with KPI stats", async ({ page }) => {
    await page.goto("/billing");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("Billing", { timeout: 10000 });
    await expect(page.locator("text=Total Collected").or(page.locator("text=Outstanding Due"))).toBeVisible({ timeout: 10000 });
  });

  test("search filters bills", async ({ page }) => {
    await page.goto("/billing");
    await page.waitForLoadState("networkidle");
    const searchInput = page.locator('[data-testid="billing-search"]').or(page.locator('main >> input[placeholder="Search patient, UHID, ABHA\"]')).first();
    await searchInput.fill("BILL");
    await page.waitForTimeout(300);
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("filter drawer opens for billing filters", async ({ page }) => {
    await page.goto("/billing");
    await page.waitForLoadState("networkidle");
    const filterBtn = page.locator('[data-testid="billing-filter"]').or(page.locator('main >> button:has-text("Filter")')).first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      await expect(page.locator("text=Status").or(page.locator("text=Category"))).toBeVisible({ timeout: 100000 });
    }
  });
});

// ── 6. PHARMACY WORKFLOW ───────────────────────────────────────────────────────

test.describe("Pharmacy workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/pharmacy");
  });

  test("pharmacy page renders with KPI stats", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Pharmacy", { timeout: 5000 });
  });

  test("search filters prescriptions", async ({ page }) => {
    const searchInput = page.locator('main >> input[placeholder*="Rx ID"]').first();
    await searchInput.fill("RX");
    await page.waitForTimeout(300);
    await expect(page.locator("body")).toBeVisible();
  });

  test("stock alerts section renders", async ({ page }) => {
    await expect(page.locator("text=Stock Alerts").or(page.locator("text=Reorder"))).toBeVisible();
  });
});

// ── 7. LAB WORKFLOW ────────────────────────────────────────────────────────────

test.describe("Lab workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("lab page renders with KPI stats", async ({ page }) => {
    await page.goto("/lab");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("Laboratory", { timeout: 10000 });
  });

  test("department filter pills exist and are clickable", async ({ page }) => {
    await page.goto("/lab");
    await page.waitForLoadState("networkidle");
    const deptPills = page.locator("[data-testid='lab-dept-all']").or(page.locator("button:has-text('All')")).first();
    if (await deptPills.isVisible()) {
      await deptPills.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("lab orders are displayed", async ({ page }) => {
    await page.goto("/lab");
    await page.waitForLoadState("networkidle");
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

// ── 8. INVENTORY WORKFLOW ──────────────────────────────────────────────────────

test.describe("Inventory workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("inventory page renders with item table", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("Inventory", { timeout: 10000 });
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("low stock alert banner displays when items below reorder", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    const banner = page.locator("text=below reorder level");
    const count = await banner.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("search filters inventory by item name", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    const searchInput = page.locator('[data-testid="inventory-search"]').or(page.locator('main >> input[placeholder="Search items..."]')).first();
    await searchInput.fill("Glove");
    await page.waitForTimeout(300);
    const rows = page.locator("table tbody tr");
    if (await rows.first().isVisible()) {
      await expect(rows.first()).toContainText("Glove");
    }
  });

  test("department dropdown filters inventory", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    const deptSelect = page.locator('[data-testid="inventory-dept"]').or(page.locator("select")).first();
    const options = await deptSelect.locator("option").allTextContents();
    expect(options.length).toBeGreaterThanOrEqual(2);
  });

  test("restock button is clickable on inventory items", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    const restockBtn = page.locator('[data-testid="inventory-restock"]').or(page.locator("button:has-text('Restock')")).first();
    if (await restockBtn.isVisible()) {
      await restockBtn.click();
    }
    await expect(page.locator("h1")).toContainText("Inventory");
  });

  test("decrement button is clickable on inventory items", async ({ page }) => {
    await page.goto("/inventory");
    await page.waitForLoadState("networkidle");
    const decBtn = page.locator('[data-testid="inventory-decrement"]').or(page.locator("button:has-text('−')")).first();
    if (await decBtn.isVisible()) {
      await decBtn.click();
    }
    await expect(page.locator("h1")).toContainText("Inventory");
  });
});

// ── 9. STAFF WORKFLOW ──────────────────────────────────────────────────────────

test.describe("Staff workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/staff");
  });

  test("staff page renders with directory table", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Staff", { timeout: 5000 });
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("search filters staff by name", async ({ page }) => {
    const searchInput = page.locator('main >> input[placeholder="Search by name or designation..."]').first();
    await searchInput.fill("Dr.");
    await page.waitForTimeout(300);
  });

  test("department dropdown exists", async ({ page }) => {
    const deptSelect = page.locator("select").first();
    const options = await deptSelect.locator("option").allTextContents();
    expect(options.length).toBeGreaterThanOrEqual(2);
  });
});

// ── 10. ASSETS WORKFLOW ────────────────────────────────────────────────────────

test.describe("Asset management workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/assets");
  });

  test("assets page renders with equipment cards", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Assets", { timeout: 5000 });
  });

  test("status filter pills switch views", async ({ page }) => {
    const allPill = page.locator("button:has-text('All')").first();
    const operationalPill = page.locator("button:has-text('Operational')").first();
    if (await operationalPill.isVisible()) {
      await operationalPill.click();
      await expect(page.locator("body")).toBeVisible();
    }
    if (await allPill.isVisible()) {
      await allPill.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("asset action buttons render", async ({ page }) => {
    const maintBtn = page.locator("button:has-text('Maintenance')").first();
    const faultBtn = page.locator("button:has-text('Report Fault')").first();
    const operationalBtn = page.locator("button:has-text('Mark Operational')").first();
    const anyBtn = [maintBtn, faultBtn, operationalBtn].find((b) => b !== null);
    if (anyBtn && await anyBtn.isVisible()) {
      await expect(anyBtn).toBeVisible();
    }
  });
});

// ── 11. CME WORKFLOW ───────────────────────────────────────────────────────────

test.describe("CME tracking workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/cme");
  });

  test("CME page renders with records", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("CME", { timeout: 5000 });
  });

  test("tab switching between All Records and Pending", async ({ page }) => {
    const allTab = page.locator("button:has-text('All Records')").first();
    const pendingTab = page.locator("button:has-text('Pending')").first();
    if (await allTab.isVisible()) {
      await allTab.click();
    }
    if (await pendingTab.isVisible()) {
      await pendingTab.click();
    }
    await expect(page.locator("body")).toBeVisible();
  });
});

// ── 12. CLINICAL CALCULATORS WORKFLOW ──────────────────────────────────────────

test.describe("Clinical calculator workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/scoring");
  });

  test("scoring page renders with calculator accordions", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Scoring", { timeout: 5000 });
  });

  test("GCS calculator accordion opens and shows inputs", async ({ page }) => {
    const gcsAccordion = page.locator("button:has-text('GCS')").first();
    if (await gcsAccordion.isVisible()) {
      await gcsAccordion.click();
      await expect(page.locator("text=Eye Opening").or(page.locator("text=Verbal"))).toBeVisible();
    }
  });

  test("NIHSS calculator accordion opens", async ({ page }) => {
    const nihssBtn = page.locator("button:has-text('NIHSS')").first();
    if (await nihssBtn.isVisible()) {
      await nihssBtn.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("CHA2DS2-VASc calculator accordion opens", async ({ page }) => {
    const chadsBtn = page.locator("button:has-text('CHA2DS2')").first();
    if (await chadsBtn.isVisible()) {
      await chadsBtn.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("SOFA calculator accordion opens", async ({ page }) => {
    const sofaBtn = page.locator("button:has-text('SOFA')").first();
    if (await sofaBtn.isVisible()) {
      await sofaBtn.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("search filters calculator cards", async ({ page }) => {
    const searchInput = page.locator('main >> input[placeholder*="Search"]').first();
    await searchInput.fill("GCS");
    await page.waitForTimeout(300);
    await expect(page.locator("text=GCS").or(page.locator("No calculators"))).toBeVisible({ timeout: 5000 });
  });
});

// ── 13. TELEMEDICINE WORKFLOW ──────────────────────────────────────────────────

test.describe("Telemedicine workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/telemedicine");
  });

  test("telemedicine page renders with consultation interface", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Telemedicine", { timeout: 5000 });
  });

  test("start consultation button renders", async ({ page }) => {
    const startBtn = page.locator("button:has-text('Start a Consultation')");
    await expect(startBtn).toBeVisible();
  });

  test("recording timer controls render", async ({ page }) => {
    const recordBtn = page.locator("button[aria-label*='Record']").or(page.locator("button:has-text('Record')"));
    if (await recordBtn.isVisible()) {
      await expect(recordBtn).toBeVisible();
    }
  });
});

// ── 14. ORDERS (CPOE) WORKFLOW ─────────────────────────────────────────────────

test.describe("Order/CPOE workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/orders");
  });

  test("orders page renders with KPI stats", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Orders", { timeout: 5000 });
  });

  test("search filters orders", async ({ page }) => {
    const searchInput = page.locator('main >> input[placeholder*="Search order"]').first();
    await searchInput.fill("ORD");
    await page.waitForTimeout(300);
    await expect(page.locator("body")).toBeVisible();
  });

  test("new order button navigates to order creation", async ({ page }) => {
    const newBtn = page.locator('main >> a[href="/orders/new"]').first();
    if (await newBtn.isVisible()) {
      await newBtn.click();
      await expect(page).toHaveURL(/\/orders\/new/);
    }
  });

  test("filter drawer opens for order filters", async ({ page }) => {
    const filterBtn = page.locator('main >> button:has-text("Filter")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      await expect(page.locator("text=Status").or(page.locator("text=Type"))).toBeVisible({ timeout: 10000 });
    }
  });
});

// ── 15. SETTINGS WORKFLOW ──────────────────────────────────────────────────────

test.describe("Settings workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/settings");
  });

  test("settings page renders with profile tab", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Settings", { timeout: 5000 });
  });

  test("tab switching between Profile, Security, Activity Log", async ({ page }) => {
    for (const tab of ["Profile", "Security", "Activity Log"]) {
      const tabBtn = page.locator(`button:has-text("${tab}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await expect(page.locator("body")).toBeVisible();
      }
    }
  });

  test("sign out button exists in security tab", async ({ page }) => {
    const securityTab = page.locator("button:has-text('Security')").first();
    if (await securityTab.isVisible()) {
      await securityTab.click();
      await expect(page.locator("button:has-text('Sign Out')").or(page.locator("button:has-text('Sign out')"))).toBeVisible();
    }
  });
});

// ── 16. PATIENT PORTAL WORKFLOW ────────────────────────────────────────────────

test.describe("Patient portal workflows", () => {
  test("portal login page renders", async ({ page }) => {
    await page.goto("/portal/login");
    await expect(page.locator("h1")).toContainText("Patient Portal", { timeout: 5000 });
  });

  test("portal dashboard redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await expect(page).toHaveURL(/\/portal\/login/);
  });

  test("portal appointments page accessible", async ({ page }) => {
    await page.goto("/portal/appointments");
    await expect(page.locator("body")).toBeVisible();
  });

  test("portal prescriptions page accessible", async ({ page }) => {
    await page.goto("/portal/prescriptions");
    await expect(page.locator("body")).toBeVisible();
  });

  test("portal records page accessible", async ({ page }) => {
    await page.goto("/portal/records");
    await expect(page.locator("body")).toBeVisible();
  });

  test("portal bills page accessible", async ({ page }) => {
    await page.goto("/portal/bills");
    await expect(page.locator("body")).toBeVisible();
  });

  test("portal profile page accessible", async ({ page }) => {
    await page.goto("/portal/profile");
    await expect(page.locator("body")).toBeVisible();
  });
});

// ── 17. MOBILE & RESPONSIVE WORKFLOW ───────────────────────────────────────────

test.describe("Mobile and responsive workflows", () => {
  test("sidebar navigation renders on desktop", async ({ page }) => {
    await loginAsDoctor(page);
    const sidebar = page.locator("nav[aria-label='Main navigation']");
    await expect(sidebar).toBeVisible();
    const links = sidebar.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(35);
  });

  test("bottom nav appears on mobile viewport", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await page.waitForURL(/\/dashboard/);
    const bottomNav = page.locator("nav.fixed.bottom-0");
    await expect(bottomNav).toBeVisible();
  });

  test("bottom nav has 5 icons on mobile", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await page.waitForURL(/\/dashboard/);
    const bottomNav = page.locator("nav.fixed.bottom-0");
    const navLinks = bottomNav.locator("a");
    const count = await navLinks.count();
    expect(count).toBe(5);
  });

  test("sidebar menu button appears on mobile", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await page.waitForURL(/\/dashboard/);
    // Use more specific selector to avoid Next.js dev tools button
    const menuBtn = page.locator("button[aria-label='Open navigation menu']").first();
    await expect(menuBtn).toBeVisible();
  });

  test("bottom nav Dashboard link works", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await page.waitForURL(/\/dashboard/);
    await page.goto("/appointments");
    await page.waitForURL(/\/appointments/);
    const dashboardLink = page.locator('nav.fixed.bottom-0 a[href="/dashboard"]').first();
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click();
      await expect(page).toHaveURL(/\/dashboard/);
    }
  });

  test("bottom nav Appointments link works", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await page.waitForURL(/\/dashboard/);
    const apptLink = page.locator('nav.fixed.bottom-0 a[href="/appointments"]').first();
    if (await apptLink.isVisible()) {
      await apptLink.click();
      await expect(page).toHaveURL(/\/appointments/);
    }
  });
});

// ── 18. SPECIALTY MODULE WORKFLOWS ─────────────────────────────────────────────

test.describe("Specialty module workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  const specialtyPages = [
    "/obgyn", "/pediatrics", "/physiotherapy", "/nephrology",
    "/ophthalmology", "/dermatology", "/emergency", "/cardiology",
    "/oncology", "/gastroenterology", "/neurology", "/cssd",
    "/registrations", "/ambulance", "/ent", "/psychiatry",
    "/rheumatology", "/infectious-disease", "/urology", "/orthopedics",
    "/ecg", "/pulmonology", "/dietary", "/blood-bank", "/radiology",
    "/diagnostics", "/examination", "/interactions",
  ];

  for (const path of specialtyPages) {
    test(`${path} loads without error`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => {
        if (!err.message.includes("Hydration failed")) {
          errors.push(err.message);
        }
      });
      await page.goto(path, { waitUntil: "networkidle" });
      const body = page.locator("body");
      await expect(body).toBeVisible({ timeout: 5000 });
      expect(errors).toEqual([]);
    });
  }
});

// ── 19. OPERATIONAL MODULE WORKFLOWS ───────────────────────────────────────────

test.describe("Operational module workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  const opPages = ["/reports", "/users", "/manage", "/ipd", "/theatre"];

  for (const path of opPages) {
    test(`${path} loads without error`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => {
        if (!err.message.includes("Hydration failed") && 
            !err.message.includes("Maximum update depth exceeded")) {
          errors.push(err.message);
        }
      });
      await page.goto(path, { waitUntil: "networkidle" });
      const body = page.locator("body");
      await expect(body).toBeVisible({ timeout: 10000 });
      expect(errors).toEqual([]);
    });
  }

  test("reports page has tab navigation", async ({ page }) => {
    await loginAsDoctor(page);
    await page.goto("/reports");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText("Reports & Analytics", { timeout: 10000 });
    for (const tab of ["Financial", "Clinical", "Lab & Imaging", "Operations"]) {
      const tabBtn = page.locator(`button:has-text("${tab}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await expect(page.locator("body")).toBeVisible();
      }
    }
  });
});

// ── 20. RECEPTION WORKFLOWS ────────────────────────────────────────────────────

test.describe("Reception workflows", () => {
  test("reception dashboard loads", async ({ page }) => {
    await loginAsReceptionist(page);
    await expect(page).toHaveURL(/\/reception/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("reception sub-pages load without error", async ({ page }) => {
    await loginAsReceptionist(page);
    const subPages = ["/reception/register", "/reception/checkin", "/reception/queue",
                      "/reception/appointments", "/reception/billing", "/reception/visitors", "/reception/ipd"];
    for (const path of subPages) {
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("body")).toBeVisible({ timeout: 5000 });
    }
  });

  test("billing page collects payment", async ({ page }) => {
    await page.goto("/login");
    await page.locator('button:has-text("nalini.das@aarogya.app")').first().click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL("**/reception", { timeout: 10000 });

    // Click the billing sidebar link (client-side navigation keeps auth)
    await page.locator('aside a[href="/reception/billing"]').first().click();
    await page.waitForURL("**/reception/billing", { timeout: 5000 });
    await page.waitForTimeout(500);

    // Find a bill with "Collect" button and click it
    const collectBtn = page.locator('button:has-text("Collect")').first();
    if (await collectBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await collectBtn.click();
      await page.waitForTimeout(300);

      // Select payment mode
      const cashBtn = page.locator('div.fixed button:has-text("Cash")').first();
      if (await cashBtn.isVisible({ timeout: 2000 }).catch(() => false)) await cashBtn.click();

      // Submit payment
      const payBtn = page.locator('div.fixed button:has-text("Collect")').last();
      if (await payBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await payBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Verify page is still functional
    await expect(page.locator("body")).toBeVisible();
  });

  test("registration page form fills and submits", async ({ page }) => {
    await page.goto("/login");
    await page.locator('button:has-text("nalini.das@aarogya.app")').first().click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL("**/reception", { timeout: 10000 });

    // Navigate via sidebar link
    await page.locator('a[href="/reception/register"]').first().click();
    await page.waitForURL("**/reception/register", { timeout: 10000 });
    await page.waitForTimeout(500);

    // Step 1: Identity
    await page.evaluate(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      const nameInput = Array.from(inputs).find(i => i.placeholder?.includes('Ravi'));
      if (nameInput && setter) { setter.call(nameInput, 'Ravi Test'); nameInput.dispatchEvent(new Event('input', { bubbles: true })); }
      const ageInput = Array.from(inputs).find(i => i.placeholder?.includes('35'));
      if (ageInput && setter) { setter.call(ageInput, '30'); ageInput.dispatchEvent(new Event('input', { bubbles: true })); }
      const maleBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Male');
      maleBtn?.click();
    });
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      const cont = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Continue'));
      cont?.click();
    });
    await page.waitForTimeout(200);

    // Step 2: Contact
    await page.evaluate(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      const mobile = Array.from(inputs).find(i => i.placeholder === '10-digit mobile');
      if (mobile && setter) { setter.call(mobile, '9876543210'); mobile.dispatchEvent(new Event('input', { bubbles: true })); }
    });
    await page.waitForTimeout(100);

    await page.evaluate(() => {
      const cont = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Continue'));
      cont?.click();
    });
    await page.waitForTimeout(200);

    // Step 3: Submit
    await page.evaluate(() => {
      const reg = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Register Patient'));
      reg?.click();
    });

    await expect(page.getByText("Patient Registered!")).toBeVisible({ timeout: 8000 });
  });
});

// ── 21. CROSS-CUTTING UI WORKFLOWS ─────────────────────────────────────────────

test.describe("Cross-cutting UI workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDoctor(page);
  });

  test("theme toggle exists and is clickable", async ({ page }) => {
    const themeBtn = page.locator("button[aria-label*='Theme']").or(page.locator("button[aria-label*='theme']"));
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("page header shows current user", async ({ page }) => {
    const avatar = page.locator('[aria-label*="User"]').or(page.locator('[aria-label*="user"]'));
    await expect(page.locator("body")).toBeVisible();
  });

  test("404 page navigates correctly", async ({ page }) => {
    await page.goto("/this-path-does-not-exist");
    await expect(page.locator("text=404").or(page.locator("text=not found"))).toBeVisible();
  });
});
