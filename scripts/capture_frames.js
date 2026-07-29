const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = 'https://dimsdevv.github.io/profile-playground/';
  const width = 700;
  const height = 360;
  const fps = 12;
  const duration = 6; // seconds
  const frames = Math.ceil(fps * duration);
  const framesDir = path.join(process.cwd(), 'frames');

  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

  console.log(`Launching browser, capturing ${frames} frames to ${framesDir}`);
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForTimeout(1000);

  for (let i = 0; i < frames; i++) {
    if (i % Math.max(1, Math.round(fps * 0.6)) === 0) {
      await page.keyboard.press(' ');
    }
    const file = path.join(framesDir, `frame${String(i).padStart(4, '0')}.png`);
    await page.screenshot({ path: file, type: 'png' });
    process.stdout.write(`.${i % 50 === 49 ? '\n' : ''}`);
    await page.waitForTimeout(Math.round(1000 / fps));
  }

  await browser.close();
  console.log('\nCapture complete');
})();