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
    // 1. DESKTOP VIEWPORT (1440 x 900)
    // ──────────────────────────────────────────────────────────
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();

    console.log("Navigating to desktop homepage...");
    await desktopPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    // 1A. Desktop Header & Hero (Initial Transparent Header)
    console.log("Capturing 01-desktop-header-hero.png...");
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, "01-desktop-header-hero.png"),
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // 1B. Desktop Full-Screen Navigation (Opened from initial top state)
    console.log("Opening full-screen menu from top state...");
    const menuBtn = desktopPage.locator('button[aria-label="Open Full-Screen Navigation Menu"]');
    await menuBtn.click({ force: true });
    await desktopPage.waitForTimeout(600);

    // Hover on "The Menu" to show dynamic preview photo
    const menuLink = desktopPage.locator('nav[aria-label="Full-Screen Navigation Links"] a:has-text("The Menu")');
    await menuLink.hover();
    await desktopPage.waitForTimeout(600);

    console.log("Capturing 03-desktop-fullscreen-nav.png...");
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, "03-desktop-fullscreen-nav.png"),
    });

    // Close menu with close button
    const closeBtn = desktopPage.locator('button[aria-label="Close Navigation Menu"]');
    await closeBtn.click({ force: true });
    await desktopPage.waitForTimeout(500);

    // 1C. Desktop Header Scrolled State (Scroll down then up)
    console.log("Testing scroll direction for compact header...");
    await desktopPage.mouse.wheel(0, 500);
    await desktopPage.waitForTimeout(300);
    await desktopPage.mouse.wheel(0, -60);
    await desktopPage.waitForTimeout(600);

    console.log("Capturing 02-desktop-header-scrolled.png...");
    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, "02-desktop-header-scrolled.png"),
      clip: { x: 0, y: 0, width: 1440, height: 160 },
    });

    // 1D. Desktop Signature Footer
    console.log("Scrolling smoothly down to footer...");
    // Scroll down to the bottom
    await desktopPage.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    });
    await desktopPage.waitForTimeout(600);

    console.log("Capturing 04-desktop-signature-footer.png...");
    const footerElement = desktopPage.locator("footer");
    await footerElement.screenshot({
      path: path.join(OUTPUT_DIR, "04-desktop-signature-footer.png"),
    });

    await desktopContext.close();

    // ──────────────────────────────────────────────────────────
    // 2. MOBILE VIEWPORT (iPhone 14 / Pro: 390 x 844)
    // ──────────────────────────────────────────────────────────
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    console.log("Navigating to mobile homepage...");
    await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    // 2A. Mobile Header & Mobile Hero
    console.log("Capturing 05-mobile-header-hero.png...");
    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, "05-mobile-header-hero.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    // 2B. Mobile Full-Screen Navigation
    console.log("Opening mobile menu...");
    const mobileMenuBtn = mobilePage.locator('button[aria-label="Open Full-Screen Navigation Menu"]');
    await mobileMenuBtn.click({ force: true });
    await mobilePage.waitForTimeout(800);

    console.log("Capturing 06-mobile-fullscreen-nav.png...");
    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, "06-mobile-fullscreen-nav.png"),
    });

    // Close mobile menu
    const mobileCloseBtn = mobilePage.locator('button[aria-label="Close Navigation Menu"]');
    await mobileCloseBtn.click({ force: true });
    await mobilePage.waitForTimeout(500);

    // 2C. Mobile Signature Footer
    console.log("Scrolling mobile sequentially down to footer...");
    await mobilePage.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    });
    await mobilePage.waitForTimeout(600);

    console.log("Capturing 07-mobile-signature-footer.png...");
    const mobileFooter = mobilePage.locator("footer");
    await mobileFooter.screenshot({
      path: path.join(OUTPUT_DIR, "07-mobile-signature-footer.png"),
    });

    await mobileContext.close();
    console.log("All screenshots captured successfully in:", OUTPUT_DIR);
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
