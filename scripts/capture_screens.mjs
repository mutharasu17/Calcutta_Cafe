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
    // 1. DESKTOP 1920 × 1080 (CINEMATIC HERO, HEADER, CARDS, CART)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Desktop 1920x1080 ---");
    const dContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const dPage = await dContext.newPage();
    await dPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(1200);

    // 1A. Fullscreen Cinematic Hero (Top fold, text directly over image, transparent header)
    console.log("Capturing 01-desktop-fullscreen-hero.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-desktop-fullscreen-hero.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // 1B. Scrolled Header Transition
    console.log("Capturing 02-desktop-header-scrolled.png...");
    await dPage.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
    await dPage.waitForTimeout(600);
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "02-desktop-header-scrolled.png"),
      clip: { x: 0, y: 0, width: 1920, height: 160 },
    });

    // Scroll through page to activate all animations
    await triggerAllScrollTriggers(dPage);

    // 1C. Category Section with Ring Animations
    console.log("Capturing 03-desktop-category-rings.png...");
    const catSec = dPage.locator("#menu-categories").first();
    await catSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    await catSec.screenshot({
      path: path.join(OUTPUT_DIR, "03-desktop-category-rings.png"),
    });

    // 1D. Signature Food Cards with Filter Tabs
    console.log("Capturing 04-desktop-signature-food-cards.png...");
    const foodSec = dPage.locator("#signature-menu").first();
    await foodSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    await foodSec.screenshot({
      path: path.join(OUTPUT_DIR, "04-desktop-signature-food-cards.png"),
    });

    // 1E. Add-to-Cart Interaction (Click Add to Feast on first dish)
    console.log("Testing Add-to-Cart interaction...");
    const addBtn = foodSec.locator("button:has-text('Add to Feast')").first();
    await addBtn.click();
    await dPage.waitForTimeout(700);

    // Capture Add-to-Cart feedback and toast
    console.log("Capturing 05-desktop-add-to-cart-toast.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "05-desktop-add-to-cart-toast.png"),
      clip: { x: 1200, y: 800, width: 720, height: 280 },
    });

    // 1F. Open Cart Drawer
    console.log("Opening Cart Drawer...");
    const cartBtn = dPage.locator("button[aria-label*='Open feast selection']").first();
    await cartBtn.click();
    await dPage.waitForTimeout(800);

    console.log("Capturing 06-desktop-cart-drawer-open.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "06-desktop-cart-drawer-open.png"),
    });

    // Close Cart Drawer
    const closeDrawerBtn = dPage.locator("button[aria-label='Close cart drawer']").first();
    await closeDrawerBtn.click();
    await dPage.waitForTimeout(500);

    // 1G. Full Desktop Page Screenshot
    console.log("Capturing 07-full-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "07-full-desktop-homepage.png"),
      fullPage: true,
    });

    await dContext.close();

    // ──────────────────────────────────────────────────────────
    // 2. MOBILE 390 × 844 (PRIMARY MOBILE PHONE BENCHMARK)
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

    // 2A. Mobile Full-Screen Hero Top Fold
    console.log("Capturing 08-mobile-fullscreen-hero.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "08-mobile-fullscreen-hero.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 2B. Mobile Navigation Overlay Open
    console.log("Opening Mobile Navigation Menu...");
    const mobileMenuBtn = m390Page.locator("button[aria-label='Open menu']").first();
    await mobileMenuBtn.click();
    await m390Page.waitForTimeout(700);

    console.log("Capturing 09-mobile-nav-overlay.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "09-mobile-nav-overlay.png"),
    });

    // Close Mobile Navigation
    const closeMobileBtn = m390Page.locator("button[aria-label='Close menu']").first();
    await closeMobileBtn.click();
    await m390Page.waitForTimeout(500);

    // Scroll through mobile
    await triggerAllScrollTriggers(m390Page);

    // 2C. Mobile Category Cards & Rings
    console.log("Capturing 10-mobile-category-cards.png...");
    const mCatSec = m390Page.locator("#menu-categories").first();
    await mCatSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mCatSec.screenshot({
      path: path.join(OUTPUT_DIR, "10-mobile-category-cards.png"),
    });

    // 2D. Mobile Food Cards & Add to Cart
    console.log("Capturing 11-mobile-food-cards.png...");
    const mFoodSec = m390Page.locator("#signature-menu").first();
    await mFoodSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mFoodSec.screenshot({
      path: path.join(OUTPUT_DIR, "11-mobile-food-cards.png"),
    });

    // Add an item on mobile
    const mAddBtn = mFoodSec.locator("button:has-text('Add to Feast')").first();
    await mAddBtn.click();
    await m390Page.waitForTimeout(600);

    // 2E. Mobile Cart Drawer Open
    console.log("Opening Cart Drawer on mobile...");
    const mCartBtn = m390Page.locator("button[aria-label*='Open feast selection']").first();
    await mCartBtn.click();
    await m390Page.waitForTimeout(800);

    console.log("Capturing 12-mobile-cart-drawer.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "12-mobile-cart-drawer.png"),
    });

    await m390Context.close();

    console.log("ALL REDESIGN VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY!");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
