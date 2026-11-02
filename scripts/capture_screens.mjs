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

    // 1A. Fullscreen Hero with text layered over image & transparent header
    console.log("Capturing 01-gsap-hero-fullscreen-text-over-image.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-gsap-hero-fullscreen-text-over-image.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    // 1B. Scrolled Header Transition
    console.log("Capturing 02-gsap-header-scrolled.png...");
    await dPage.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
    await dPage.waitForTimeout(600);
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "02-gsap-header-scrolled.png"),
      clip: { x: 0, y: 0, width: 1920, height: 160 },
    });

    // Scroll through page to activate all animations
    await triggerAllScrollTriggers(dPage);

    // 1C. Category Section with DrawSVG and MotionPath Orbiting Rings
    console.log("Capturing 03-gsap-category-svg-rings-motion.png...");
    const catSec = dPage.locator("#menu-categories").first();
    await catSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(700);
    await catSec.screenshot({
      path: path.join(OUTPUT_DIR, "03-gsap-category-svg-rings-motion.png"),
    });

    // 1D. Menu Filtering: Test Fish & Seafood Category
    console.log("Testing Category Filter: Fish & Seafood...");
    const menuSec = dPage.locator("#signature-menu").first();
    await menuSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);

    const fishTab = menuSec.locator("button:has-text('Fish & Seafood')").first();
    await fishTab.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 04-gsap-menu-filter-fish-seafood.png...");
    await menuSec.screenshot({
      path: path.join(OUTPUT_DIR, "04-gsap-menu-filter-fish-seafood.png"),
    });

    // 1E. Menu Filtering: Test Chicken & Mutton Category
    console.log("Testing Category Filter: Chicken & Mutton...");
    const meatTab = menuSec.locator("button:has-text('Chicken & Mutton')").first();
    await meatTab.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 05-gsap-menu-filter-chicken-mutton.png...");
    await menuSec.screenshot({
      path: path.join(OUTPUT_DIR, "05-gsap-menu-filter-chicken-mutton.png"),
    });

    // 1F. Menu Filtering: Test Vegetarian Delicacies Category
    console.log("Testing Category Filter: Vegetarian...");
    const vegTab = menuSec.locator("button:has-text('Vegetarian')").first();
    await vegTab.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 06-gsap-menu-filter-vegetarian.png...");
    await menuSec.screenshot({
      path: path.join(OUTPUT_DIR, "06-gsap-menu-filter-vegetarian.png"),
    });

    // 1G. Menu Filtering: Test Sweets & Desserts Category
    console.log("Testing Category Filter: Mithai / Sweets...");
    const sweetTab = menuSec.locator("button:has-text('Mithai')").first();
    await sweetTab.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 07-gsap-menu-filter-sweets.png...");
    await menuSec.screenshot({
      path: path.join(OUTPUT_DIR, "07-gsap-menu-filter-sweets.png"),
    });

    // 1H. Add to Cart Interaction (Add Mishti Doi to cart)
    console.log("Testing Add-to-Cart interaction on Mishti Doi...");
    const addBtn = menuSec.locator("button:has-text('Add to Feast')").first();
    await addBtn.click();
    await dPage.waitForTimeout(600);

    console.log("Capturing 08-gsap-add-to-cart-interaction-and-toast.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "08-gsap-add-to-cart-interaction-and-toast.png"),
      clip: { x: 1200, y: 760, width: 720, height: 320 },
    });

    // 1I. Open Cart Drawer
    console.log("Opening Cart Drawer...");
    const cartBtn = dPage.locator("#header-cart-btn").first();
    await cartBtn.click();
    await dPage.waitForTimeout(800);

    console.log("Capturing 09-gsap-cart-drawer-open.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "09-gsap-cart-drawer-open.png"),
    });

    // Close Cart Drawer
    const closeDrawerBtn = dPage.locator("button[aria-label='Close cart drawer']").first();
    await closeDrawerBtn.click();
    await dPage.waitForTimeout(500);

    // 1J. Full Desktop Page Screenshot
    console.log("Capturing 10-full-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "10-full-desktop-homepage.png"),
      fullPage: true,
    });

    await dContext.close();

    // ──────────────────────────────────────────────────────────
    // 2. MOBILE 390 × 844 VERIFICATION
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
    console.log("Capturing 11-mobile-hero-and-header.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "11-mobile-hero-and-header.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 2B. Mobile Navigation Overlay Open
    console.log("Opening Mobile Navigation Menu...");
    const mobileMenuBtn = m390Page.locator("button[aria-label='Open menu']").first();
    await mobileMenuBtn.click();
    await m390Page.waitForTimeout(700);

    console.log("Capturing 12-mobile-nav-overlay.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "12-mobile-nav-overlay.png"),
    });

    // Close Mobile Navigation
    const closeMobileBtn = m390Page.locator("button[aria-label='Close menu']").first();
    await closeMobileBtn.click();
    await m390Page.waitForTimeout(500);

    // Scroll through mobile
    await triggerAllScrollTriggers(m390Page);

    // 2C. Mobile Category & Filtered Menu
    console.log("Capturing 13-mobile-category-and-menu-filter.png...");
    const mMenuSec = m390Page.locator("#signature-menu").first();
    await mMenuSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);

    // Click Fish & Seafood on mobile
    const mFishTab = mMenuSec.locator("button:has-text('Fish & Seafood')").first();
    await mFishTab.click();
    await m390Page.waitForTimeout(600);

    await mMenuSec.screenshot({
      path: path.join(OUTPUT_DIR, "13-mobile-category-and-menu-filter.png"),
    });

    // 2D. Add an item and open cart drawer on mobile
    const mAddBtn = mMenuSec.locator("button:has-text('Add to Feast')").first();
    await mAddBtn.click();
    await m390Page.waitForTimeout(600);

    const mCartBtn = m390Page.locator("#header-cart-btn").first();
    await mCartBtn.click();
    await m390Page.waitForTimeout(800);

    console.log("Capturing 14-mobile-cart-drawer.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "14-mobile-cart-drawer.png"),
    });

    await m390Context.close();

    console.log("ALL GSAP REDESIGN VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY!");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
