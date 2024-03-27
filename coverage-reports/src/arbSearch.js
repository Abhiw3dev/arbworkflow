//This will check the search time for an application. Target site used: appreviewbot.com and next.appreviewbot.com

const puppeteer = require('puppeteer')
 

(async () => {
 
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'], defaultViewport: null });

    const page = await browser.newPage();

    console.log("Begin to test the appreviewbot.com");

    await page.goto('https://appreviewbot.com/', { waitUntil: 'load' });

    console.log("> Reached target site");

    // await sleep(2000);

    const startTime = new Date(); // Record the start time

    await page.click('input[placeholder="Type your app name to get started"]', { delay: 1000 });
    await page.type('input[placeholder="Type your app name to get started"]', 'Facebook');

    await page.waitForSelector('div[class= "search__results"]', {waitUntil:"load"});

    const endTime = new Date(); // Record the end time

    const responseTime = endTime - startTime;
    console.log(`> Response time: ${responseTime / 1000 % 60} seconds`);

    console.log(`> Test done for appreviewbot.com\n`);

    // await sleep(5000)

    const page2 = await browser.newPage()
    console.log("Begin to test the next.appreviewbot.com");

    await page2.goto('https://next.appreviewbot.com/', { waitUntil: 'load' });

    console.log("> Reached target site");

    // await sleep(1000);

    const startTime1 = new Date(); // Record the start time

    await page2.click('input[placeholder="Type your app name to get started"]');
    await page2.type('input[placeholder="Type your app name to get started"]', 'Slack');

    await page2.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]',{waitUntil: "load"}); // Replace with the actual selector that appears after the search

    const endTime1 = new Date(); // Record the end time

    const responseTime1 = endTime1 - startTime1;
    console.log(`> Response time: ${responseTime1 / 1000 % 60} seconds`);

    console.log(`> Test done for next.appreviewbot.com`);

    const conclusion = (`-> Response time by appreviewbot.com: ${responseTime / 1000 % 60} seconds\n -> Response time by next.appreviewbot.com: ${responseTime1 / 1000 % 60} seconds`)
    console.log(`Conclusion:\n ${conclusion}`)

    // await sleep(5000)
    await browser.close()
})

 