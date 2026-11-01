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

async function run() {
  console.log("Starting Next.js production server on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  // Wait for server to become responsive
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
    } catch (e) {
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
    // 1. MOBILE 390 × 844 (PRIMARY MOBILE BENCHMARK)
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
    await m390Page.waitForTimeout(1500);

    // 1A. Mobile Homepage Top Fold (Announcement + Header + Hero)
    console.log("Capturing anand-01-mobile-390-homepage.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "anand-01-mobile-390-homepage.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 1B. Mobile Shop Our Range
    console.log("Capturing anand-02-mobile-390-shop-our-range.png...");
    const rangeSec = m390Page.locator("section:has-text('Shop Our Range.')").first();
    await rangeSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(600);
    await rangeSec.screenshot({
      path: path.join(OUTPUT_DIR, "anand-02-mobile-390-shop-our-range.png"),
    });

    // 1C. Mobile Brand Trust Strip
    console.log("Capturing anand-03-mobile-390-trust-strip.png...");
    const trustSec = m390Page.locator("section:has-text('100% Heritage Recipes')").first();
    await trustSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await trustSec.screenshot({
      path: path.join(OUTPUT_DIR, "anand-03-mobile-390-trust-strip.png"),
    });

    // 1D. Mobile Best Sellers
    console.log("Capturing anand-04-mobile-390-bestsellers.png...");
    const bestSec = m390Page.locator("section:has-text('Best-Selling Delicacies.')").first();
    await bestSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(600);
    await bestSec.screenshot({
      path: path.join(OUTPUT_DIR, "anand-04-mobile-390-bestsellers.png"),
    });

    // 1E. Mobile Promotional Collections
    console.log("Capturing anand-05-mobile-390-promotional-banners.png...");
    const promoSec = m390Page.locator("section:has-text('Taste of Bengal Collections.')").first();
    await promoSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(600);
    await promoSec.screenshot({
      path: path.join(OUTPUT_DIR, "anand-05-mobile-390-promotional-banners.png"),
    });

    // 1F. Mobile Slide-Over Navigation Drawer
    console.log("Opening mobile navigation drawer...");
    const drawerBtn = m390Page.locator('button[aria-label="Open navigation drawer"]');
    await drawerBtn.click({ force: true });
    await m390Page.waitForTimeout(600);
    console.log("Capturing anand-06-mobile-390-drawer-navigation.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "anand-06-mobile-390-drawer-navigation.png"),
    });
    const closeBtn = m390Page.locator('button[aria-label="Close navigation drawer"]');
    await closeBtn.click({ force: true });
    await m390Page.waitForTimeout(400);

    await m390Context.close();

    // ──────────────────────────────────────────────────────────
    // 2. MOBILE 375 × 812 (COMPACT SMARTPHONE)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Mobile 375x812 ---");
    const m375Context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const m375Page = await m375Context.newPage();
    await m375Page.goto(BASE_URL, { waitUntil: "networkidle" });
    await m375Page.waitForTimeout(1000);
    console.log("Capturing anand-07-mobile-375-compact.png...");
    await m375Page.screenshot({
      path: path.join(OUTPUT_DIR, "anand-07-mobile-375-compact.png"),
      clip: { x: 0, y: 0, width: 375, height: 812 },
    });
    await m375Context.close();

    // ──────────────────────────────────────────────────────────
    // 3. MOBILE 430 × 932 (LARGE SMARTPHONE / PRO MAX)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Mobile 430x932 ---");
    const m430Context = await browser.newContext({
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const m430Page = await m430Context.newPage();
    await m430Page.goto(BASE_URL, { waitUntil: "networkidle" });
    await m430Page.waitForTimeout(1000);
    console.log("Capturing anand-08-mobile-430-large.png...");
    await m430Page.screenshot({
      path: path.join(OUTPUT_DIR, "anand-08-mobile-430-large.png"),
      clip: { x: 0, y: 0, width: 430, height: 932 },
    });
    await m430Context.close();

    // ──────────────────────────────────────────────────────────
    // 4. TABLET 768 × 1024
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Tablet 768x1024 ---");
    const tabContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
    });
    const tabPage = await tabContext.newPage();
    await tabPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await tabPage.waitForTimeout(1000);
    console.log("Capturing anand-09-tablet-768.png...");
    await tabPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-09-tablet-768.png"),
      clip: { x: 0, y: 0, width: 768, height: 950 },
    });
    await tabContext.close();

    // ──────────────────────────────────────────────────────────
    // 5. LAPTOP 1366 × 768
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Laptop 1366x768 ---");
    const lapContext = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      deviceScaleFactor: 2,
    });
    const lapPage = await lapContext.newPage();
    await lapPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await lapPage.waitForTimeout(1000);
    console.log("Capturing anand-10-laptop-1366.png...");
    await lapPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-10-laptop-1366.png"),
      clip: { x: 0, y: 0, width: 1366, height: 768 },
    });
    await lapContext.close();

    // ──────────────────────────────────────────────────────────
    // 6. DESKTOP 1920 × 1080 (FULL ANAND SUITE)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Desktop 1920x1080 ---");
    const dContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const dPage = await dContext.newPage();
    await dPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(1500);

    // 6A. Desktop Hero
    console.log("Capturing anand-11-desktop-1920-hero.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-11-desktop-1920-hero.png"),
      clip: { x: 0, y: 0, width: 1920, height: 980 },
    });

    // 6B. Desktop Dropdown Mega Menu
    console.log("Opening Categories Mega Dropdown...");
    const catBtn = dPage.locator("button:has-text('Categories')").first();
    await catBtn.hover();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-12-desktop-1920-dropdown-mega-menu.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-12-desktop-1920-dropdown-mega-menu.png"),
      clip: { x: 0, y: 0, width: 1920, height: 620 },
    });
    // Move mouse away to close dropdown
    await dPage.mouse.move(10, 10);
    await dPage.waitForTimeout(300);

    // 6C. Desktop Shop Our Range
    console.log("Scrolling to Shop Our Range...");
    const dRange = dPage.locator("section:has-text('Shop Our Range.')").first();
    await dRange.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-13-desktop-1920-shop-our-range.png...");
    await dRange.screenshot({
      path: path.join(OUTPUT_DIR, "anand-13-desktop-1920-shop-our-range.png"),
    });

    // 6D. Desktop Best Sellers
    console.log("Scrolling to Best Sellers...");
    const dBest = dPage.locator("section:has-text('Best-Selling Delicacies.')").first();
    await dBest.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-14-desktop-1920-bestsellers.png...");
    await dBest.screenshot({
      path: path.join(OUTPUT_DIR, "anand-14-desktop-1920-bestsellers.png"),
    });

    // 6E. Desktop Promotional Collections
    console.log("Scrolling to Promotional Collections...");
    const dPromo = dPage.locator("section:has-text('Taste of Bengal Collections.')").first();
    await dPromo.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-15-desktop-1920-promotional-banners.png...");
    await dPromo.screenshot({
      path: path.join(OUTPUT_DIR, "anand-15-desktop-1920-promotional-banners.png"),
    });

    // 6F. Desktop Our Speciality
    console.log("Scrolling to Our Speciality...");
    const dSpec = dPage.locator("section:has-text('Our Signature Specialities.')").first();
    await dSpec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-16-desktop-1920-our-speciality.png...");
    await dSpec.screenshot({
      path: path.join(OUTPUT_DIR, "anand-16-desktop-1920-our-speciality.png"),
    });

    // 6G. Desktop Street Food
    console.log("Scrolling to Street Savouries...");
    const dStreet = dPage.locator("section:has-text('Street Savouries & Snacks.')").first();
    await dStreet.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-17-desktop-1920-street-food.png...");
    await dStreet.screenshot({
      path: path.join(OUTPUT_DIR, "anand-17-desktop-1920-street-food.png"),
    });

    // 6H. Desktop Our Story
    console.log("Scrolling to Our Story...");
    const dStory = dPage.locator("section:has-text('Rooted in Bengal, Handcrafted in Bangalore.')").first();
    await dStory.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-18-desktop-1920-brand-story.png...");
    await dStory.screenshot({
      path: path.join(OUTPUT_DIR, "anand-18-desktop-1920-brand-story.png"),
    });

    // 6I. Desktop Journal Grid
    console.log("Scrolling to Bengal Journal...");
    const dJournal = dPage.locator("section:has-text('Stories from the Kitchen.')").first();
    await dJournal.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-19-desktop-1920-journal.png...");
    await dJournal.screenshot({
      path: path.join(OUTPUT_DIR, "anand-19-desktop-1920-journal.png"),
    });

    // 6J. Desktop Retail Footer
    console.log("Scrolling to Retail Footer...");
    const dFooter = dPage.locator("footer").first();
    await dFooter.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-20-desktop-1920-retail-footer.png...");
    await dFooter.screenshot({
      path: path.join(OUTPUT_DIR, "anand-20-desktop-1920-retail-footer.png"),
    });

    // 6K. Live Search Modal Interaction
    console.log("Opening Search Dialog...");
    await dPage.evaluate(() => window.scrollTo(0, 0));
    await dPage.waitForTimeout(400);
    const searchIcon = dPage.locator('button[aria-label="Open search dialog"]').first();
    await searchIcon.click();
    await dPage.waitForTimeout(500);
    console.log("Capturing anand-21-search-modal-interaction.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-21-search-modal-interaction.png"),
    });
    await dPage.keyboard.press("Escape");
    await dPage.waitForTimeout(300);

    // 6L. Dish Detail Modal Interaction
    console.log("Opening Dish Detail Modal...");
    const viewDetailBtn = dPage.locator("button:has-text('View Details')").first();
    await viewDetailBtn.scrollIntoViewIfNeeded();
    await viewDetailBtn.click();
    await dPage.waitForTimeout(600);
    console.log("Capturing anand-22-dish-detail-modal-interaction.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "anand-22-dish-detail-modal-interaction.png"),
    });
    await dPage.keyboard.press("Escape");
    await dPage.waitForTimeout(300);

    await dContext.close();

    console.log("ALL 22 ANAND-INSPIRED VERIFICATION CAPTURES COMPLETED SUCCESSFULLY!");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
