
const puppeteer = require('puppeteer');

async function searchTime(url, searchTerm) {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
    const page = await browser.newPage();

    try {
        await page.goto(url,{ waitUntil: 'networkidle0', timeout: 80000 });
        const NavigationUrl = page.url();
        let responseTime;

        if (NavigationUrl.includes('https://appreviewbot.com/')) {
            await page.click('input[placeholder="Type your app name to get started"]');
            await page.type('input[placeholder="Type your app name to get started"]', searchTerm, { delay: 100 });
            const startTime = new Date();
            await page.waitForSelector('div[class="search__results"]');
            const endTime = new Date();
            responseTime = (endTime - startTime) / 1000;
        } else if (NavigationUrl.includes('https://next.appreviewbot.com/')) {
            await page.click('input[placeholder="Type your app name to get started"]');
            await page.type('input[placeholder="Type your app name to get started"]', searchTerm, { delay: 100 });
            const startTime = new Date();
            await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');
            const endTime = new Date();
            responseTime = (endTime - startTime) / 1000;
        } else {
            console.log('URL did not match expected patterns.');
        }

        // Log and return response time outside of conditionals, after closing the browser
        console.log("Search time: ", responseTime, "at URL: ", url);
        return responseTime;
    } finally {
        // Ensure the browser is always closed, even if an error occurs
        await browser.close();
    }
}

module.exports = searchTime;


