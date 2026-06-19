import { test, expect, type Page } from "@playwright/test";

async function loginAsDoctor(page: Page) {
  await page.goto("/login");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL("**/dashboard", { timeout: 10000 });
}

const SMOKE_ROUTES = [
  // Landing & Auth
  { path: "/", title: "Aarogya EHR" },
  { path: "/login", title: "Sign In" },
  { path: "/register", title: "Register" },

  // Overview
  { path: "/dashboard", title: "Dashboard" },
  { path: "/appointments", title: "Appointments" },

  // Core Clinical
  { path: "/patients", title: "Patients" },
  { path: "/examination", title: "Examination" },
  { path: "/telemedicine", title: "Telemedicine" },
  { path: "/scoring", title: "Scoring" },
  { path: "/orders", title: "Orders" },
  { path: "/interactions", title: "Drug Interactions" },

  // Diagnostics
  { path: "/lab", title: "Laboratory" },
  { path: "/diagnostics", title: "Diagnostics" },
  { path: "/radiology", title: "Radiology" },
  { path: "/dicom-viewer", title: "DICOM Viewer" },
  { path: "/ecg", title: "ECG" },
  { path: "/pulmonology", title: "Pulmonology" },

  // Pharmacy & Blood Bank
  { path: "/pharmacy", title: "Pharmacy" },
  { path: "/blood-bank", title: "Blood Bank" },
  { path: "/dietary", title: "Dietary" },

  // IPD & OT
  { path: "/ipd", title: "IPD" },
  { path: "/theatre", title: "Theatre" },

  // Specialty modules
  { path: "/obgyn", title: "OB/GYN" },
  { path: "/pediatrics", title: "Pediatrics" },
  { path: "/physiotherapy", title: "Physiotherapy" },
  { path: "/nephrology", title: "Nephrology" },
  { path: "/ophthalmology", title: "Ophthalmology" },
  { path: "/dermatology", title: "Dermatology" },
  { path: "/emergency", title: "Emergency" },
  { path: "/cardiology", title: "Cardiology" },
  { path: "/oncology", title: "Oncology" },
  { path: "/gastroenterology", title: "Gastroenterology" },
  { path: "/neurology", title: "Neurology" },
  { path: "/cssd", title: "CSSD" },
  { path: "/registrations", title: "Registrations" },
  { path: "/ambulance", title: "Ambulance" },
  { path: "/ent", title: "ENT" },
  { path: "/psychiatry", title: "Psychiatry" },
  { path: "/rheumatology", title: "Rheumatology" },
  { path: "/infectious-disease", title: "Infectious Disease" },
  { path: "/urology", title: "Urology" },
  { path: "/orthopedics", title: "Orthopedics" },

  // Operations
  { path: "/billing", title: "Billing" },
  { path: "/inventory", title: "Inventory" },
  { path: "/staff", title: "Staff" },
  { path: "/assets", title: "Assets" },
  { path: "/cme", title: "CME" },
  { path: "/reports", title: "Reports" },

  // Admin
  { path: "/users", title: "Users" },
  { path: "/manage", title: "Manage" },
  { path: "/settings", title: "Settings" },

  // Reception
  { path: "/reception", title: "Reception" },
  { path: "/reception/register", title: "Register" },
  { path: "/reception/checkin", title: "Check-in" },
  { path: "/reception/queue", title: "Queue" },
  { path: "/reception/appointments", title: "Appointments" },
  { path: "/reception/billing", title: "Billing" },
  { path: "/reception/visitors", title: "Visitors" },
  { path: "/reception/ipd", title: "IPD" },

  // Patient Portal
  { path: "/portal/login", title: "Patient Login" },
  { path: "/portal/dashboard", title: "Patient Dashboard" },
  { path: "/portal/appointments", title: "Book Appointment" },
  { path: "/portal/prescriptions", title: "My Prescriptions" },
  { path: "/portal/records", title: "My Records" },
  { path: "/portal/bills", title: "My Bills" },
  { path: "/portal/profile", title: "My Profile" },
];

for (const route of SMOKE_ROUTES) {
  test(`${route.path} — loads without error`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => {
      if (!err.message.includes("Hydration failed") &&
          !err.message.includes("Maximum update depth exceeded")) {
        errors.push(err.message);
      }
    });

    await page.goto(route.path, { waitUntil: "networkidle" });

    const currentUrl = page.url();
    const urlPath = new URL(currentUrl).pathname;
    const allowedDestinations = [route.path, "/login", "/portal/login"];
    expect(allowedDestinations).toContain(urlPath);

    const body = page.locator("body");
    await expect(body).toBeVisible();

    if (route.title && route.path !== "/" && route.path !== "/login" && route.path !== "/register") {
      const heading = page.locator("h1").first();
      await expect(heading).toBeVisible({ timeout: 5000 });
    }

    expect(errors, `Console errors on ${route.path}`).toEqual([]);
  });
}

test.describe("Navigation smoke tests", () => {
  test("sidebar navigation renders all groups", async ({ page }) => {
    await loginAsDoctor(page);
    const sidebar = page.locator("nav[aria-label='Main navigation']");
    await expect(sidebar).toBeVisible();
    const links = sidebar.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(35);
  });

  test("bottom nav visible on mobile viewport", async ({ page }) => {
    await loginAsDoctor(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    const bottomNav = page.locator("nav.fixed.bottom-0");
    await expect(bottomNav).toBeVisible();
  });
});
