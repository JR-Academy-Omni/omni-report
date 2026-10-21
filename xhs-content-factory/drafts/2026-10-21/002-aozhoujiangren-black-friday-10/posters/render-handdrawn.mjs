import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page = await browser.newPage({viewport:{width:1242,height:1660},deviceScaleFactor:1});
await page.goto(pathToFileURL(path.join(dir,'render-handdrawn.html')).href,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
for(let i=1;i<=7;i++){
  const selector=`#p${String(i).padStart(2,'0')}`;
  await page.locator(selector).screenshot({path:path.join(dir,`handdrawn-${String(i).padStart(2,'0')}.png`)});
}
const thumbs = Array.from({length:7},(_,i)=>`<figure><img src="${pathToFileURL(path.join(dir,`handdrawn-${String(i+1).padStart(2,'0')}.png`)).href}"><figcaption>${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('');
await page.setViewportSize({width:960,height:1320});
await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;padding:20px;background:#eee;font-family:Arial}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}figure{margin:0;background:#fff;padding:8px;box-shadow:0 2px 10px #999}img{display:block;width:100%;height:auto}figcaption{text-align:center;font-weight:700;padding:6px}</style><div class="grid">${thumbs}</div>`);
await page.waitForTimeout(500);
await page.screenshot({path:path.join(dir,'handdrawn-contact-sheet.jpg'),fullPage:true,type:'jpeg',quality:88});
await browser.close();
