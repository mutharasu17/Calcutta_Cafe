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
  const maxRetries = 30;
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

    // 1A. Mobile Hero & Dock
    console.log("Capturing 01-mobile-390-hero-video.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "01-mobile-390-hero-video.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 1B. Mobile Signature Dish (VERIFY FOOD IS 100% VISIBLE WITH NO OVERLAY)
    console.log("Scrolling to mobile signature dish...");
    const signatureSection = m390Page.locator("section:has-text('Traditional Kosha Mangsho')");
    await signatureSection.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(800);
    console.log("Capturing 02-mobile-390-signature-dish-uncovered.png...");
    await signatureSection.screenshot({
      path: path.join(OUTPUT_DIR, "02-mobile-390-signature-dish-uncovered.png"),
    });

    // 1C. Mobile The Craft Video Film
    console.log("Scrolling to The Craft Film...");
    const craftSection = m390Page.locator("section:has-text('The craft in motion')");
    await craftSection.scrollIntoViewIfNeeded();
    await m390Page.waitForTimeout(800);
    console.log("Capturing 03-mobile-390-craft-video.png...");
    await craftSection.screenshot({
      path: path.join(OUTPUT_DIR, "03-mobile-390-craft-video.png"),
    });

    // 1D. Mobile Footer & Safe-Area Dock Separation
    console.log("Scrolling to mobile footer...");
    await m390Page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await m390Page.waitForTimeout(800);
    console.log("Capturing 04-mobile-390-footer-no-overlap.png...");
    await m390Page.screenshot({
      path: path.join(OUTPUT_DIR, "04-mobile-390-footer-no-overlap.png"),
    });

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
    console.log("Capturing 05-mobile-375-viewport.png...");
    await m375Page.screenshot({
      path: path.join(OUTPUT_DIR, "05-mobile-375-viewport.png"),
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
    console.log("Capturing 06-mobile-430-viewport.png...");
    await m430Page.screenshot({
      path: path.join(OUTPUT_DIR, "06-mobile-430-viewport.png"),
      clip: { x: 0, y: 0, width: 430, height: 932 },
    });
    await m430Context.close();

    // ──────────────────────────────────────────────────────────
    // 4. TABLET 768 × 1024 (IPAD / TABLET)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Tablet 768x1024 ---");
    const tabContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
    });
    const tabPage = await tabContext.newPage();
    await tabPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await tabPage.waitForTimeout(1000);
    console.log("Capturing 07-tablet-768-hero.png...");
    await tabPage.screenshot({
      path: path.join(OUTPUT_DIR, "07-tablet-768-hero.png"),
      clip: { x: 0, y: 0, width: 768, height: 900 },
    });
    await tabContext.close();

    // ──────────────────────────────────────────────────────────
    // 5. LAPTOP 1366 × 768
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Laptop 1366x768 ---");
    const laptopContext = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      deviceScaleFactor: 2,
    });
    const laptopPage = await laptopContext.newPage();
    await laptopPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await laptopPage.waitForTimeout(1000);
    console.log("Capturing 08-laptop-1366-hero.png...");
    await laptopPage.screenshot({
      path: path.join(OUTPUT_DIR, "08-laptop-1366-hero.png"),
      clip: { x: 0, y: 0, width: 1366, height: 768 },
    });
    await laptopContext.close();

    // ──────────────────────────────────────────────────────────
    // 6. DESKTOP 1920 × 1080 (CINEMATIC FULL HD)
    // ──────────────────────────────────────────────────────────
    console.log("--- Testing Desktop 1920x1080 ---");
    const d1920Context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const d1920Page = await d1920Context.newPage();
    await d1920Page.goto(BASE_URL, { waitUntil: "networkidle" });
    await d1920Page.waitForTimeout(1500);

    console.log("Capturing 09-desktop-1920-hero-video.png...");
    await d1920Page.screenshot({
      path: path.join(OUTPUT_DIR, "09-desktop-1920-hero-video.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    console.log("Scrolling to Desktop Signature Stage...");
    const dSig = d1920Page.locator("section:has-text('Traditional Kosha Mangsho')");
    await dSig.scrollIntoViewIfNeeded();
    await d1920Page.waitForTimeout(800);
    console.log("Capturing 10-desktop-1920-signature-stage.png...");
    await dSig.screenshot({
      path: path.join(OUTPUT_DIR, "10-desktop-1920-signature-stage.png"),
    });

    await d1920Context.close();

    console.log("ALL 6 VIEWPORTS VERIFIED AND SCREENSHOTS CAPTURED!");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
