const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  const here = __dirname;
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 1 });
  await page.goto(`file:///${path.join(here, 'carousel-v2.html').replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pages = page.locator('.page');
  const count = await pages.count();
  if (count !== 9) throw new Error(`Expected 9 pages, got ${count}`);
  const thumbs = [];
  for (let i = 0; i < count; i += 1) {
    const filename = `0${i + 1}-usyd-cs-roadmap-v2.png`;
    const output = path.join(here, filename);
    await pages.nth(i).screenshot({ path: output, type: 'png' });
    const meta = await sharp(output).metadata();
    if (meta.width !== 1080 || meta.height !== 1440) throw new Error(`${filename}: ${meta.width}x${meta.height}`);
    thumbs.push(await sharp(output).resize(270, 360).png().toBuffer());
  }
  const composite = thumbs.map((input, i) => ({ input, left:(i%3)*270, top:Math.floor(i/3)*360 }));
  await sharp({ create:{ width:810, height:1080, channels:4, background:'#252525' } }).composite(composite).png().toFile(path.join(here,'contact-sheet-v2.png'));
  await browser.close();
  fs.writeFileSync(path.join(here,'render-report-v2.json'), JSON.stringify({ pages:9, dimensions:'1080x1440', aspect_ratio:'3:4', accent_color:'#EE5D31', logo_used:false }, null, 2)+'\n');
})();
