const puppeteer = require('puppeteer');
const start = Date.now();

(async () => {
    const browser = await puppeteer.launch({
        "headless": true,
        "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
        "ignoreHTTPSErrors": true
    });
    const page = await browser.newPage();
    await page.goto('https://pacoca.io/dashboard?address=0xe78d801db11065b1d15aa8a4e414b40d10305098', { waitUntil: 'networkidle2', timeout: 0 });
    await delay(1000)
    await page.screenshot({path: 'example.png'});
    const f = await page.$("[class='relative font-900 text-28 tablet:text-36 leading-1.25 mb-8']")
    //obtain text
    const text = (await (await f.getProperty('textContent')).jsonValue()).split(' ')[12]
    console.log("Text is: " + text)
    await browser.close();
    const millis = Date.now() - start;
    console.log("durée : " + Math.floor(millis / 1000))
})();

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
