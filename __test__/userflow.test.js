
// const puppeteerExtra = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const googleLogin = require('../utils/googleLogin.js');
// const loginHandler = require('../testfile/controllers/googleLoginNext.js');
// const sleep = require('../utils/sleep.js');
// const dotenv = require('dotenv');

// const fs = require('fs');
// const cookiesSlackPath = './signInCookies/slackCookies.json'
 
// describe('First User Flow Test', () => {

//     beforeAll(async () => {
//         console.log('Starting the Jest test for the arb first user flow');

//     });

//     test('Login and Integration Test', async () => {
//         dotenv.config();
//         puppeteerExtra.use(StealthPlugin());
//         const browser = await puppeteerExtra.launch({ headless:false,
//              args: [
//                 '--start-maximized',
//                 // '--window-position=9999,9999', 
//                 //  '--no-sandbox', 
//                 //  '--disable-setuid-sandbox',
//                 // '--disable-dev-shm-usage', 
//                 // '--dumpio'
//             ],
//          defaultViewport: null });

       
        
//         try{
//         const page = await browser.newPage()
//         // const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
//         // await pages.setUserAgent(userAgent);
//         googleLogin(page, sleep)
//         }catch(error){
//             console.error('Error during the login process: ', error)
//         }
//         await sleep(60000)

//         if (fs.existsSync(cookiesSlackPath)) {
//             const slackpage = await browser.newPage();
//             const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
//             for (let cookie of cookies) {
//                 await slackpage.setCookie(cookie);
//             }
//             console.log('Cookies loaded successfully for Slack.');

//             await slackpage.goto('https://slack.com/intl/en-in/connect');
//             await sleep(2000)
//             await slackpage.click('button[class="c-button v--primary v--with-dropdown"]')
//             await sleep(1000)
//             await slackpage.click('span[class="o-media-object__content c-nav__workspace--name"]')
//             await sleep(5000)
            
//         } else {
//             console.log('No cookies file found for Slack.');
//             await browser.close()
//         }
 
//         await sleep(10000)
//         const page = await browser.newPage();
//         console.log('Beginning test on next.appreviewbot.com');
//         await page.goto('https://next.appreviewbot.com/login/', { waitUntil: 'load', timeout: 60000 });
//         console.log("> Reached target site");
//         await sleep(10000);
//         loginHandler(page)

//         await sleep(120000)
//         console.log('> Searching for the application');
//         await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
//         await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
//         console.log('> An application is searched ');

//         await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');
//         await page.click('span[class="flex items-center w-11/12 cursor-pointer"]');
//         console.log('> Selected a result from the search result');
//         await sleep(10000);

//         console.log('> Clicked on "Add to Slack"');
//         await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]');
//         await sleep(20000);

//         await page.click('input[class="c-input_text c-select_input"]');
//         await sleep(5000);
//         await page.type('input[class="c-input_text c-select_input"]', 'arb', { delay: 150 });
//         await page.keyboard.press('Enter');
//         console.log(' > Selected a channel for integration');
//         await sleep(2000);

//         // Clicking on the allow button
//         await page.keyboard.press('Enter');
//         await page.keyboard.press('Enter');
//         console.log('Allow button clicked');

//         await sleep(25000);

//         console.log(' > Waiting for a few seconds until Alerts to appear');
//         const innerText = await page.evaluate(() => {
//             const targetElement = document.querySelector('div[class="container py-10"]');
//             return targetElement ? targetElement.innerText.trim() : null;
//         });

//         const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan.";
//         const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";
//         const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
//         const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
//         const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

//         console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);

//         if (normalizedInnerText.includes(normalizedMessage_1)) {
//             expect(normalizedInnerText).toContain(normalizedMessage_1);
//             console.log(" > Integration not successful, it requires upgrading the plan");
//         } else if (normalizedInnerText.includes(normalizedMessage_2)) {
//             expect(normalizedInnerText).toContain(normalizedMessage_2);
//             console.log(' > Integration successful');
//         } else {
//             console.log(' > Unexpected message:', normalizedInnerText);
//         }
//         await browser.close()
//     }, 600000); // Set timeout to 10 minutes (600000 milliseconds)
// });







// const puppeteerExtra = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const googleLogin = require('../utils/googleLogin.js');
// const loginHandler = require('../testfile/controllers/googleLoginNext.js');
// const sleep = require('../utils/sleep.js');
// const dotenv = require('dotenv');

// const fs = require('fs');
// const cookiesSlackPath = './signInCookies/slackCookies.json';
 
// describe('First User Flow Test', () => {

//     beforeAll(async () => {
//         console.log('Starting the Jest test for the arb first user flow');
//     });

//     test('Login and Integration Test', async () => {
//         dotenv.config();
//         puppeteerExtra.use(StealthPlugin());
//         const browser = await puppeteerExtra.launch({ headless: true,args: [
//             '--start-maximized',
//             // '--window-position=9999,9999', 
//             // '--no-sandbox', 
//             // '--disable-setuid-sandbox',
//             // '--disable-dev-shm-usage', 
//             // '--dumpio'
//         ],
//      defaultViewport: null }); // Set headless mode to true

//         try {
//             const page = await browser.newPage();
//             await page.setViewport({
//                 width: 1920, // Set width to match screen resolution
//                 height: 1080, // Set height to match screen resolution
//                 deviceScaleFactor: 1,
//               });
//             googleLogin(page, sleep);
//         } catch (error) {
//             console.error('Error during the login process: ', error);
//         }

//         await sleep(60000);

//         if (fs.existsSync(cookiesSlackPath)) {
//             const slackpage = await browser.newPage();
//             const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
//             for (let cookie of cookies) {
//                 await slackpage.setCookie(cookie);
//             }
//             console.log('Cookies loaded successfully for Slack.');

//             // await slackpage.goto('https://slack.com/intl/en-in/connect');
//             // await sleep(2000);
//             // await slackpage.click('button[class="c-button v--primary v--with-dropdown"]');
//             // await sleep(1000);
//             // await slackpage.click('span[class="o-media-object__content c-nav__workspace--name"]');
//             // await sleep(5000);
            
//         } else {
//             console.log('No cookies file found for Slack.');
//             await browser.close();
//         }
 
//         await sleep(10000);
//         const page = await browser.newPage();
//         await page.setViewport({
//             width: 1920, // Set width to match screen resolution
//             height: 1080, // Set height to match screen resolution
//             deviceScaleFactor: 1,
//           });
//         console.log('Beginning test on next.appreviewbot.com');
//         await page.goto('https://next.appreviewbot.com/login/', { waitUntil: 'load', timeout: 60000 });
//         console.log("> Reached target site");
//         await sleep(10000);
//         loginHandler(page);

//         await sleep(120000);
//         console.log('> Searching for the application');
//         await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
//         await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
//         console.log('> An application is searched ');

//         await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');
//         await page.click('span[class="flex items-center w-11/12 cursor-pointer"]');
//         console.log('> Selected a result from the search result');
//         await sleep(10000);

//         console.log('> Clicked on "Add to Slack"');
//         await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]');
//         await sleep(20000);

//         await page.click('input[class="c-input_text c-select_input"]');
//         await sleep(5000);
//         await page.type('input[class="c-input_text c-select_input"]', 'arb', { delay: 150 });
//         await page.keyboard.press('Enter');
//         console.log(' > Selected a channel for integration');
//         await sleep(2000);

//         // Clicking on the allow button
//         await page.keyboard.press('Enter');
//         await page.keyboard.press('Enter');
//         console.log('Allow button clicked');

//         await sleep(25000);

//         console.log(' > Waiting for a few seconds until Alerts to appear');
//         const innerText = await page.evaluate(() => {
//             const targetElement = document.querySelector('div[class="container py-10"]');
//             return targetElement ? targetElement.innerText.trim() : null;
//         });

//         const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan.";
//         const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";
//         const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
//         const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
//         const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

//         console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);

//         if (normalizedInnerText.includes(normalizedMessage_1)) {
//             expect(normalizedInnerText).toContain(normalizedMessage_1);
//             console.log(" > Integration not successful, it requires upgrading the plan");
//         } else if (normalizedInnerText.includes(normalizedMessage_2)) {
//             expect(normalizedInnerText).toContain(normalizedMessage_2);
//             console.log(' > Integration successful');
//         } else {
//             console.log(' > Unexpected message:', normalizedInnerText);
//         }
//         await browser.close();
//     }, 600000); // Set timeout to 10 minutes (600000 milliseconds)
// });














const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const sleep = require('../utils/sleep.js');
const dotenv = require('dotenv');
const clipboardy = require('clipboardy');
const fetchMailData = require('../utils/fetchMailContent.js');
const fs = require('fs');
const firstUserFlow = require('../testarbflow.js');
 
describe('First User Flow Test', () => {

    beforeAll(async () => {
        console.log('Starting the Jest test for the arb first user flow');
    });

    test('Login and Integration Test', async () => {

         
        dotenv.config();
        puppeteer.use(StealthPlugin());


        

        const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'], defaultViewport: null });

        console.log('login the gmail account');

        const pages = await browser.newPage();
        await pages.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        const cookiesSlackPath = './signInCookies/slackCookies.json'

        if (fs.existsSync(cookiesSlackPath)) {
            const slackpage = await browser.newPage();
            const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
            for (let cookie of cookies) {
                await slackpage.setCookie(cookie);
            }
            console.log('Cookies loaded successfully for Slack.');
        } else {
            console.log('No cookies file found for Slack.');
            await browser.close()
        }

        await sleep(10000)
        const page = await browser.newPage();

        console.log("Begin to test the next.appreviewbot.com");

        await page.goto('https://next.appreviewbot.com/login/', { waitUntil: 'load' });

        console.log("> Reached target site");


        console.log('> Initiating the Login Process ')

        clipboardy.writeSync(' ');

        await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com');
        await page.keyboard.press('Enter');
        await sleep(10000);

        const otpCode = await fetchMailData();
        console.log('OTP Code:', otpCode);

        await sleep(30000)

        await page.type('input[class="w-full py-3 px-4 text-lg text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg  bg-white"]', otpCode);

        await page.screenshot({ path: './otp-screenshot.png', fullPage: true });
        await sleep(2000)
        console.log(' > OTP pasted')
        await sleep(1000)
        await page.screenshot({ path: './otp overview-screenshot.png', fullPage: true });
        await sleep(5000)

        await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')
        await sleep(20000)
 
        const url = page.url()
        console.log(url)
        await page.screenshot({ path: './after otp-screenshot.png', fullPage: true });

        if(url.includes('https://next.appreviewbot.com/login/')){
            console.log('> Navigation is not correct')
            await browser.close()
        }else{
            console.log('> Navigated to correct URL and Proceeding with searching the application')
        }


        await sleep(4000)
        await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
        await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
        console.log('> An application is searched ')

        await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');

        await page.click('span[class="flex items-center w-11/12 cursor-pointer"]')
        console.log('> Selected a result from the search result ')
        await sleep(5000)

        await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]')
        console.log('> Clicked on "Add to Slack" ')
        await sleep(10000)

        await page.type('input[class="c-input_text c-select_input"]', 'arb')
        await sleep(2000)
        console.log(' > Selected a channel for integration')

        await page.keyboard.press('Enter')

        await sleep(2000)
        const allowButton = 'button[class="c-button c-button--primary c-button--medium"]'
        await page.waitForSelector(allowButton, { visible: true })

        for (let i = 0; i < 5; i++) {
            await pages.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter')
        console.log(' > Clicked on "Allow" button')

        await sleep(15000)
        console.log(' > Waiting for few seconds until Alerts to appear')

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
        console.log(' ');

        if (normalizedInnerText.includes(normalizedMessage_1)) {
            console.log("  > Integration not successful, it requires upgrading the plan");
            console.log(' ');
        } else if (normalizedInnerText.includes(normalizedMessage_2)) {
            console.log('  > Integration successful');
            console.log(' ');
        } else {
            console.log('  > Unexpected message:', normalizedInnerText);
            console.log(' ');
        }

        await sleep(5000)
        await browser.close()
        
    }, 600000); // Set timeout to 10 minutes (600000 milliseconds)
});








/*
"jest": {
    "testEnvironment": "node",
    "preset": "jest-puppeteer",
    "setupFilesAfterEnv": [
      "<rootDir>/jest.setup.js"
    ],
*/