
const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const googleLogin = require('../utils/googleLogin.js');
const loginHandler = require('../testfile/controllers/googleLoginNext.js');
const sleep = require('../utils/sleep.js');
const dotenv = require('dotenv');

const fs = require('fs');
const cookiesSlackPath = './signInCookies/slackCookies.json'
 
describe('First User Flow Test', () => {

    beforeAll(async () => {
        console.log('Starting the Jest test for the arb first user flow');

    });

    test('Login and Integration Test', async () => {
        dotenv.config();
        puppeteerExtra.use(StealthPlugin());
        const browser = await puppeteerExtra.launch({ headless: "new",
             args: [
                '--start-maximized',
                // '--window-position=9999,9999', 
                // '--no-sandbox', 
                // '--disable-setuid-sandbox',
                // '--disable-dev-shm-usage', 
                // '--dumpio'
            ],
         defaultViewport: null });

       
        
        try{
        const pages = await browser.newPage()
        // const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        // await pages.setUserAgent(userAgent);
        googleLogin(pages, sleep)
        }catch(error){
            console.error('Error during the login process: ', error)
        }
        await sleep(30000)

        if (fs.existsSync(cookiesSlackPath)) {
            const slackpage = await browser.newPage();
            const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
            for (let cookie of cookies) {
                await slackpage.setCookie(cookie);
            }
            console.log('Cookies loaded successfully for Slack.');

            await slackpage.goto('https://slack.com/intl/en-in/connect');
            await sleep(2000)
            await slackpage.click('button[class="c-button v--primary v--with-dropdown"]')
            await sleep(1000)
            await slackpage.click('span[class="o-media-object__content c-nav__workspace--name"]')
            await sleep(5000)
            
        } else {
            console.log('No cookies file found for Slack.');
            await browser.close()
        }
 
        await sleep(10000)
        const page = await browser.newPage();
        console.log('Beginning test on next.appreviewbot.com');
        await page.goto('https://next.appreviewbot.com/', { waitUntil: 'load', timeout: 60000 });
        console.log("> Reached target site");
        await sleep(10000);
        loginHandler(page)

        await sleep(30000)
        console.log('> Searching for the application');
        await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
        await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
        console.log('> An application is searched ');

        await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');
        await page.click('span[class="flex items-center w-11/12 cursor-pointer"]');
        console.log('> Selected a result from the search result');
        await sleep(10000);

        console.log('> Clicked on "Add to Slack"');
        await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]');
        await sleep(20000);

        await page.click('input[class="c-input_text c-select_input"]');
        await sleep(5000);
        await page.type('input[class="c-input_text c-select_input"]', 'arb', { delay: 150 });
        await page.keyboard.press('Enter');
        console.log(' > Selected a channel for integration');
        await sleep(2000);

        // Clicking on the allow button
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        console.log('Allow button clicked');

        await sleep(25000);

        console.log(' > Waiting for a few seconds until Alerts to appear');
        const innerText = await page.evaluate(() => {
            const targetElement = document.querySelector('div[class="container py-10"]');
            return targetElement ? targetElement.innerText.trim() : null;
        });

        const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan.";
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
        await browser.close()
    }, 600000); // Set timeout to 10 minutes (600000 milliseconds)
});
