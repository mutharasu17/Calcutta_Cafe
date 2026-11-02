import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3088;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = "/Users/mutharasu/.gemini/antigravity/brain/b4266d15-741c-4a45-b463-358c908e6285/screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function triggerAllScrollTriggers(page) {
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 60;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((r) => setTimeout(r, delay));
    }
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(600);
}

async function run() {
  console.log("Starting Next.js production server on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  const maxRetries = 35;
  let ready = false;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) {
        ready = true;
        console.log("Server is ready at", BASE_URL);
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  if (!ready) {
    console.error("Server failed to start");
    server.kill();
    process.exit(1);
  }

  console.log("Launching Chromium via Playwright...");
  const browser = await chromium.launch({ headless: true });

  try {
    // ──────────────────────────────────────────────────────────
    // 1. DESKTOP 1920 × 1080 VERIFICATION
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Desktop 1920x1080 ---");
    const dContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const dPage = await dContext.newPage();
    await dPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(1000);

    // 1. New Desktop Homepage (Hero top fold)
    console.log("Capturing 01-bright-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-bright-desktop-homepage.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // 2. New Desktop Header (scrolled state)
    console.log("Capturing 02-bright-desktop-header.png...");
    await dPage.evaluate(() => window.scrollTo({ top: 250, behavior: "instant" }));
    await dPage.waitForTimeout(500);
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "02-bright-desktop-header.png"),
      clip: { x: 0, y: 0, width: 1920, height: 160 },
    });

    // Scroll through page to activate animations
    await triggerAllScrollTriggers(dPage);

    // 3. New Explore Dishes Section
    console.log("Capturing 03-bright-explore-dishes.png...");
    const catSec = dPage.locator("#explore-categories").first();
    await catSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(800);
    await catSec.screenshot({
      path: path.join(OUTPUT_DIR, "03-bright-explore-dishes.png"),
    });

    // Full desktop page
    console.log("Capturing 10-full-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "10-full-desktop-homepage.png"),
      fullPage: true,
    });

    // ──────────────────────────────────────────────────────────
    // 2. DEDICATED MENU PAGE VERIFICATION (/menu)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Menu Page (/menu) ---");
    await dPage.goto(`${BASE_URL}/menu`, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(1000);

    // 4. Menu page before category selection (All Dishes)
    console.log("Capturing 04-menu-before-category-selection.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "04-menu-before-category-selection.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // 5. Menu after selecting Fish & Seafood
    console.log("Selecting Fish & Seafood on /menu...");
    const fishBtn = dPage.locator("button:has-text('Fish & Seafood')").first();
    await fishBtn.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 05-menu-fish-and-seafood.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "05-menu-fish-and-seafood.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // 6. Menu after selecting Chicken & Mutton
    console.log("Selecting Chicken & Mutton on /menu...");
    const meatBtn = dPage.locator("button:has-text('Chicken & Mutton')").first();
    await meatBtn.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 06-menu-chicken-and-mutton.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "06-menu-chicken-and-mutton.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // Test Add to Feast on Menu Page
    console.log("Testing Add to Feast on Kosha Mangsho...");
    const addFeastBtn = dPage.locator("button:has-text('Add to Feast')").first();
    await addFeastBtn.click();
    await dPage.waitForTimeout(600);

    // Open Cart Drawer
    console.log("Opening Cart Drawer on Desktop...");
    const cartBtn = dPage.locator("#header-cart-btn").first();
    await cartBtn.click();
    await dPage.waitForTimeout(800);

    console.log("Capturing 09-bright-cart-drawer-open.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "09-bright-cart-drawer-open.png"),
    });

    await dContext.close();

    // ──────────────────────────────────────────────────────────
    // 3. MOBILE 390 × 844 VERIFICATION
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Mobile 390x844 ---");
    const m390Context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const m390Page = await m390Context.newPage();
    await m390Page.goto(BASE_URL, { waitUntil: "networkidle" });
    await m390Page.waitForTimeout(1000);

    // 7. Mobile homepage
    console.log("Capturing 07-bright-mobile-homepage.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "07-bright-mobile-homepage.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // Mobile Navigation Overlay
    console.log("Opening Mobile Navigation Menu...");
    const mobileMenuBtn = m390Page.locator("button[aria-label='Open navigation menu']").first();
    await mobileMenuBtn.click();
    await m390Page.waitForTimeout(600);

    console.log("Capturing 11-bright-mobile-nav-overlay.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "11-bright-mobile-nav-overlay.png"),
    });

    // Close Mobile Navigation
    const closeMobileBtn = m390Page.locator("button[aria-label='Close navigation menu']").first();
    await closeMobileBtn.click();
    await m390Page.waitForTimeout(500);

    // 8. Mobile Menu Page
    console.log("Navigating to Mobile Menu /menu...");
    await m390Page.goto(`${BASE_URL}/menu`, { waitUntil: "networkidle" });
    await m390Page.waitForTimeout(1000);

    console.log("Capturing 08-bright-mobile-menu.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "08-bright-mobile-menu.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // Mobile Cart Drawer
    const mAddBtn = m390Page.locator("button:has-text('Add to Feast')").first();
    await mAddBtn.click();
    await m390Page.waitForTimeout(600);

    const mCartBtn = m390Page.locator("#header-cart-btn").first();
    await mCartBtn.click();
    await m390Page.waitForTimeout(800);

    console.log("Capturing 12-bright-mobile-cart-drawer.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "12-bright-mobile-cart-drawer.png"),
    });

    await m390Context.close();

    console.log("ALL MANDATORY SCREENSHOTS CAPTURED SUCCESSFULLY!");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
