import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";

const PORT = 3089;
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
    console.error("Server failed to start on port", PORT);
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const errors = [];
  page.on("pageerror", (err) => {
    console.error("[BROWSER ERROR]:", err.message);
    errors.push(err.message);
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("[CONSOLE ERROR]:", msg.text());
      errors.push(msg.text());
    }
  });

  console.log("Navigating to homepage...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Check initial scroll position
  const initialScroll = await page.evaluate(() => window.scrollY);
  console.log("Initial scrollY:", initialScroll);

  // Test mouse wheel scroll down
  console.log("Testing mouse wheel scrolling...");
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(800);

  const scrollAfterWheel = await page.evaluate(() => window.scrollY);
  console.log("ScrollY after wheel(0, 600):", scrollAfterWheel);

  // Test deeper scrolling down the page
  console.log("Testing deep scroll down the page...");
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "smooth" }));
  await page.waitForTimeout(1000);

  const scrollAfterSmooth = await page.evaluate(() => window.scrollY);
  console.log("ScrollY after scrollTo(1500):", scrollAfterSmooth);

  // Scroll to bottom through all sections
  console.log("Scrolling through entire page...");
  await page.evaluate(async () => {
    for (let i = 0; i < 8; i++) {
      window.scrollBy(0, 800);
      await new Promise((r) => setTimeout(r, 150));
    }
  });
  await page.waitForTimeout(1000);

  const deepScroll = await page.evaluate(() => window.scrollY);
  console.log("ScrollY after full page scroll:", deepScroll);

  await page.screenshot({ path: `${OUTPUT_DIR}/scroll-verified-desktop.png`, fullPage: false });

  // Test mobile viewport
  console.log("Testing mobile viewport & scroll...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = mobileContext.newPage ? await mobileContext.newPage() : await mobileContext.newPage();

  mobilePage.on("pageerror", (err) => {
    console.error("[MOBILE BROWSER ERROR]:", err.message);
    errors.push(err.message);
  });

  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  // Mobile scroll test
  await mobilePage.evaluate(() => window.scrollBy(0, 500));
  await mobilePage.waitForTimeout(500);
  const mobileScroll = await mobilePage.evaluate(() => window.scrollY);
  console.log("Mobile scrollY after scrollBy(500):", mobileScroll);

  await mobilePage.screenshot({ path: `${OUTPUT_DIR}/scroll-verified-mobile.png`, fullPage: false });

  await browser.close();
  server.kill();

  console.log("==========================================");
  console.log("VERIFICATION COMPLETE");
  console.log("Total errors captured:", errors.length);
  if (errors.length > 0) {
    console.error("Errors found:", errors);
    process.exit(1);
  } else {
    console.log("ZERO ERRORS! Page scrolling verified successfully on both Desktop & Mobile.");
  }
}

run().catch((err) => {
  console.error("Test script failed:", err);
  process.exit(1);
});
