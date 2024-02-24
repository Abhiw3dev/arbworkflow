const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const googleLogin = require('../utils/googleLogin.js');
const loginHandler = require('../testfile/controllers/googleLoginNext.js');
const sleep = require('../utils/sleep.js');
const dotenv = require('dotenv');
const clipboardy = require('clipboardy');

describe('First User Flow Test', () => {
    //   let browser;
    //   let page;

    beforeAll(async () => {
        // dotenv.config();
        // puppeteerExtra.use(StealthPlugin());
        // browser = await puppeteerExtra.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
        // page = await browser.newPage();
        console.log('Starting the Jest test for the arb first user flow')
    });

    //   afterAll(async () => {
    //     await browser.close();
    //   });

    test('Login and Integration Test', async () => {
        dotenv.config();
        puppeteerExtra.use(StealthPlugin());
        const browser = await puppeteerExtra.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
        const pages = await browser.newPage();
        console.log('Logging in to Gmail');
        await googleLogin(pages, sleep);
        await sleep(10000);


        console.log('Beginning test on next.appreviewbot.com');
        const page = await browser.newPage();
        await page.goto('https://next.appreviewbot.com/', { waitUntil: 'load', timeout: 60000 });
        console.log("> Reached target site");
        await sleep(5000);

        console.log('> Initiating the Login Process');

        await loginHandler(page);
        await sleep(4000);

        console.log('> Searching for the application');
        await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
        await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
        console.log('> An application is searched ');

        await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');
        await page.click('span[class="flex items-center w-11/12 cursor-pointer"]');
        console.log('> Selected a result from the search result');
        await sleep(5000);

        console.log('> Clicked on "Add to Slack"');
        await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]');
        await sleep(10000);


        await page.click('input[class="c-input_text c-select_input"]')
        await sleep(1000)
        await page.type('input[class="c-input_text c-select_input"]', 'arb', { delay: 150 });
        await page.keyboard.press('Enter');
        console.log(' > Selected a channel for integration');
        await sleep(2000);
        await page.keyboard.press('Enter')
        console.log('click 1')
        await page.keyboard.press('Enter')
        console.log('click 2')

        await sleep(25000)

        //click the "Allow" button
        // const allowButton = 'button[type="submit"]'
        // const allowButton = await page.waitForSelector('button[type="submit"]', { visible: true })
    //     const xpathAllowButton = '//*[@id="oauth_install_form"]/div/div[2]/button';
    //     const buttonElement = await page.$x(xpathAllowButton);
    //     if (buttonElement.length > 0) {
    //         await buttonElement[0].click();
    //         console.log(' allow button clicked')
    //     }

    //     // await page.click( )
    // else {
    //     console.log(' > Clicked on "Allow" button not clicked')
    // }
        // for (let i = 0; i < 7; i++) {
        //     await pages.keyboard.press('Tab');
        // }
        // await page.keyboard.press('Enter')
        //  console.log(' > Clicked on "Allow" button')


        console.log(' > Waiting for few seconds until Alerts to appear');
    const innerText = await page.evaluate(() => {
        const targetElement = document.querySelector('div[class="container py-10"]');
        return targetElement ? targetElement.innerText.trim() : null;
    });

    const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan";
    const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";
    const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
    const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
    const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

    console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);

    if (normalizedInnerText.includes(normalizedMessage_1)) {
        expect(normalizedInnerText).toContain(normalizedMessage_1);
        console.log(" > Integration not successful, it requires upgrading the plan");
    } else if (normalizedInnerText.includes(normalizedMessage_2)) {
        expect(normalizedInnerText).toContain(normalizedMessage_2);
        console.log(' > Integration successful');
    } else {
        console.log(' > Unexpected message:', normalizedInnerText);
    }


    await sleep(5000);
    await browser.close()
}, 600000); // Set timeout to 10 minutes (600000 milliseconds)
});
