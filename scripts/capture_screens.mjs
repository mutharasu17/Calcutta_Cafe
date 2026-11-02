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
    const delay = 70;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((r) => setTimeout(r, delay));
    }
    await new Promise((r) => setTimeout(r, 400));
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
    // 1. DESKTOP 1920 × 1080 (FULL SUITE)
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

    // 1A. Hero Section
    console.log("Capturing 01-desktop-hero.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-desktop-hero.png"),
      clip: { x: 0, y: 0, width: 1920, height: 980 },
    });

    // 1B. Brand Introduction
    console.log("Capturing 02-desktop-brand-intro.png...");
    const introSec = dPage.locator("section[aria-label='Brand Introduction']").first();
    await introSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await introSec.screenshot({
      path: path.join(OUTPUT_DIR, "02-desktop-brand-intro.png"),
    });

    // 1C. Signature Food Experience
    console.log("Capturing 03-desktop-signature-experience.png...");
    const sigSec = dPage.locator("section[aria-label='Signature Food Experience']").first();
    await sigSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await sigSec.screenshot({
      path: path.join(OUTPUT_DIR, "03-desktop-signature-experience.png"),
    });

    // 1D. Menu Discovery
    console.log("Capturing 04-desktop-menu-discovery.png...");
    const catSec = dPage.locator("section[aria-label='Explore Our Menu Categories']").first();
    await catSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await catSec.screenshot({
      path: path.join(OUTPUT_DIR, "04-desktop-menu-discovery.png"),
    });

    // 1E. Featured Food Section
    console.log("Capturing 05-desktop-featured-food.png...");
    const featSec = dPage.locator("section[aria-label='Featured Signature Dishes']").first();
    await featSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await featSec.screenshot({
      path: path.join(OUTPUT_DIR, "05-desktop-featured-food.png"),
    });

    // 1F. Campaign Banner
    console.log("Capturing 06-desktop-campaign-banner.png...");
    const campSec = dPage.locator("section[aria-label='Editorial Campaign Banner']").first();
    await campSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await campSec.screenshot({
      path: path.join(OUTPUT_DIR, "06-desktop-campaign-banner.png"),
    });

    // 1G. Restaurant Story
    console.log("Capturing 07-desktop-restaurant-story.png...");
    const storySec = dPage.locator("section[aria-label='Restaurant Story and Founder']").first();
    await storySec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await storySec.screenshot({
      path: path.join(OUTPUT_DIR, "07-desktop-restaurant-story.png"),
    });

    // 1H. Food and Restaurant Visual Gallery
    console.log("Capturing 08-desktop-visual-gallery.png...");
    const gallSec = dPage.locator("section[aria-label='Food and Restaurant Visual Gallery']").first();
    await gallSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await gallSec.screenshot({
      path: path.join(OUTPUT_DIR, "08-desktop-visual-gallery.png"),
    });

    // 1I. Order Online Section
    console.log("Capturing 09-desktop-order-online.png...");
    const orderSec = dPage.locator("section[aria-label='Order Online for Delivery']").first();
    await orderSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await orderSec.screenshot({
      path: path.join(OUTPUT_DIR, "09-desktop-order-online.png"),
    });

    // 1J. Restaurant Information
    console.log("Capturing 10-desktop-restaurant-info.png...");
    const infoSec = dPage.locator("section[aria-label='Restaurant Information and Hubs']").first();
    await infoSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await infoSec.screenshot({
      path: path.join(OUTPUT_DIR, "10-desktop-restaurant-info.png"),
    });

    // 1K. Preserved Existing Footer
    console.log("Capturing 11-desktop-footer.png...");
    const footSec = dPage.locator("footer").first();
    await footSec.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await footSec.screenshot({
      path: path.join(OUTPUT_DIR, "11-desktop-footer.png"),
    });

    // 1L. Full Desktop Homepage
    console.log("Capturing 12-full-desktop-homepage.png...");
    await dPage.screenshot({
      path: path.join(OUTPUT_DIR, "12-full-desktop-homepage.png"),
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

    // 2A. Mobile Homepage Top Fold (Header + Hero)
    console.log("Capturing 13-mobile-homepage.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "13-mobile-homepage.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 2B. Mobile Menu Discovery
    console.log("Capturing 14-mobile-menu-discovery.png...");
    const mCatSec = m390Page.locator("section[aria-label='Explore Our Menu Categories']").first();
    await mCatSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mCatSec.screenshot({
      path: path.join(OUTPUT_DIR, "14-mobile-menu-discovery.png"),
    });

    // 2C. Mobile Featured Food
    console.log("Capturing 15-mobile-featured-food.png...");
    const mFeatSec = m390Page.locator("section[aria-label='Featured Signature Dishes']").first();
    await mFeatSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mFeatSec.screenshot({
      path: path.join(OUTPUT_DIR, "15-mobile-featured-food.png"),
    });

    // 2D. Mobile Order Online
    console.log("Capturing 16-mobile-order-online.png...");
    const mOrderSec = m390Page.locator("section[aria-label='Order Online for Delivery']").first();
    await mOrderSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mOrderSec.screenshot({
      path: path.join(OUTPUT_DIR, "16-mobile-order-online.png"),
    });

    // 2E. Mobile Footer
    console.log("Capturing 17-mobile-footer.png...");
    const mFootSec = m390Page.locator("footer").first();
    await mFootSec.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(500);
    await mFootSec.screenshot({
      path: path.join(OUTPUT_DIR, "17-mobile-footer.png"),
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
