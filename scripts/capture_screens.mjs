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
    const distance = 450;
    const delay = 80;
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
    // 1. DESKTOP 1920 × 1080 (FULL MANDATORY SUITE)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Desktop 1920x1080 ---");
    const dContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const dPage = await dContext.newPage();
    await dPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(1000);

    // Scroll through to activate all ScrollTriggers
    console.log("Activating all scroll animations...");
    await triggerAllScrollTriggers(dPage);

    // 1A. Desktop Hero
    console.log("Capturing 01-desktop-hero.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-desktop-hero.png"),
      clip: { x: 0, y: 0, width: 1920, height: 960 },
    });

    // 1B. Desktop Category Section
    console.log("Capturing 02-desktop-category-section.png...");
    const catSec = dPage.locator("section:has-text('Shop Our Range.')").first();
    await catSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await catSec.screenshot({
      path: path.join(OUTPUT_DIR, "02-desktop-category-section.png"),
    });

    // 1C. Desktop Best Sellers Gallery
    console.log("Capturing 03-desktop-bestsellers-gallery.png...");
    const bestSec = dPage.locator("section:has-text('Best-Selling Delicacies.')").first();
    await bestSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await bestSec.screenshot({
      path: path.join(OUTPUT_DIR, "03-desktop-bestsellers-gallery.png"),
    });

    // 1D. Desktop Promotional Collection
    console.log("Capturing 04-desktop-promotional-collection.png...");
    const promoSec = dPage.locator("section:has-text('Taste of Bengal Collections.')").first();
    await promoSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await promoSec.screenshot({
      path: path.join(OUTPUT_DIR, "04-desktop-promotional-collection.png"),
    });

    // 1E. Desktop Speciality Showcase
    console.log("Capturing 05-desktop-speciality-showcase.png...");
    const specSec = dPage.locator("section:has-text('Signature Specialities.')").first();
    await specSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await specSec.screenshot({
      path: path.join(OUTPUT_DIR, "05-desktop-speciality-showcase.png"),
    });

    // 1F. Desktop Food Discovery
    console.log("Capturing 06-desktop-food-discovery.png...");
    const discSec = dPage.locator("section:has-text('Discover Our Menu.')").first();
    await discSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await discSec.screenshot({
      path: path.join(OUTPUT_DIR, "06-desktop-food-discovery.png"),
    });

    // 1G. Desktop Brand Story
    console.log("Capturing 07-desktop-brand-story.png...");
    const storySec = dPage.locator("section:has-text('Bringing the Taste of Bengal Closer to Everyone.')").first();
    await storySec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await storySec.screenshot({
      path: path.join(OUTPUT_DIR, "07-desktop-brand-story.png"),
    });

    // 1H. Desktop Journal
    console.log("Capturing 08-desktop-journal.png...");
    const jourSec = dPage.locator("section:has-text('Stories from the Kitchen.')").first();
    await jourSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await jourSec.screenshot({
      path: path.join(OUTPUT_DIR, "08-desktop-journal.png"),
    });

    // 1I. Desktop Existing Footer
    console.log("Capturing 09-desktop-footer.png...");
    const footSec = dPage.locator("footer").first();
    await footSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await footSec.screenshot({
      path: path.join(OUTPUT_DIR, "09-desktop-footer.png"),
    });

    // 1J. Full Desktop Homepage
    console.log("Capturing 14-full-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "14-full-desktop-homepage.png"),
      fullPage: true,
    });

    await dContext.close();

    // ──────────────────────────────────────────────────────────
    // 2. MOBILE 390 × 844 (PRIMARY MOBILE BENCHMARK)
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
    await triggerAllScrollTriggers(m390Page);

    // 2A. Mobile Homepage Top Fold (Compact Header directly at top, portrait hero)
    console.log("Capturing 10-mobile-homepage.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "10-mobile-homepage.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 2B. Mobile Category Browsing
    console.log("Capturing 11-mobile-category-browsing.png...");
    const mCatSec = m390Page.locator("section:has-text('Shop Our Range.')").first();
    await mCatSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mCatSec.screenshot({
      path: path.join(OUTPUT_DIR, "11-mobile-category-browsing.png"),
    });

    // 2C. Mobile Product Gallery
    console.log("Capturing 12-mobile-product-gallery.png...");
    const mBestSec = m390Page.locator("section:has-text('Best-Selling Delicacies.')").first();
    await mBestSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mBestSec.screenshot({
      path: path.join(OUTPUT_DIR, "12-mobile-product-gallery.png"),
    });

    // 2D. Mobile Footer
    console.log("Capturing 13-mobile-footer.png...");
    const mFootSec = m390Page.locator("footer").first();
    await mFootSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mFootSec.screenshot({
      path: path.join(OUTPUT_DIR, "13-mobile-footer.png"),
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
