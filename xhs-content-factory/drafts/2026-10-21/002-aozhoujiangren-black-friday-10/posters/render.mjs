import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1242, height: 1660 }, deviceScaleFactor: 1 });
await page.goto('file:///' + path.join(here, 'render.html').replace(/\\/g, '/'));
await page.waitForLoadState('networkidle');
await page.evaluate(() => document.fonts.ready);
for (let i = 1; i <= 7; i++) {
  const id = `#p${String(i).padStart(2, '0')}`;
  await page.locator(id).screenshot({ path: path.join(here, `${String(i).padStart(2, '0')}-${i === 1 ? 'cover' : 'content'}.png`) });
}
await browser.close();
