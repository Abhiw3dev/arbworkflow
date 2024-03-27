const puppeteerExtra = require('puppeteer-extra');
const dismissButtonClick = require("../utils/dismissButton");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');  
const sleep = require('../utils/sleep');
const cookiesFilePath = './signInCookies/googleCookies.json'


puppeteerExtra.use(StealthPlugin());

const slackLogin = async () => {
    const browser = await puppeteerExtra.launch({
        headless: false,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });
    

    if (fs.existsSync(cookiesFilePath)) {
        const page = await browser.newPage();
        const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));
        for (let cookie of cookies) {
            await page.setCookie(cookie);
        }
        console.log('Cookies loaded successfully.');
        // Navigate to a page that doesn't require login to verify if cookies work
        await page.goto('https://www.google.com');
    } else {
        console.log('No cookies file found. Proceeding to login.');
        // Your login script here
    }
   
    const pages = await browser.newPage();
    await pages.goto('https://www.google.com');
    console.log('> Initating the Slack Login')
    await pages.type('textarea[class="gLFyf"]','https://slack.com/intl/en-in/connect')
    await pages.keyboard.press('Enter')
    await sleep(2000)
    await pages.click('a[jsname="UWckNb"]')

    console.log('  > Visited the Slack official page')
    
    await sleep(30000)
    await pages.click('a[class="c-button v--left v--primary"]')
    console.log('  > Clicked on "Try For Free" Button')
    await sleep(5000)

    
    await pages.click('button[class="c-button c-button--outline c-button--large c-third_party_auth c-google_login full_width"]')
    console.log('  > Clicked on "Continue With Google" Button')
    await sleep(9000)

    // To remove the Dismiss button 
     dismissButtonClick(pages)
     await sleep(2000)
     const googleUsername = "testarbatw3dev@gmail.com";
     const googlePassword = "com.gmail@testarbatw3dev";

     await pages.waitForSelector('input[type="email"]', { visible: true });
     await pages.type('input[type="email"]', googleUsername);
     await pages.keyboard.press('Enter');
     console.log('> Google Email ID entered:', googleUsername);
    await sleep(8000)
     
     await pages.waitForSelector('input[type="password"]', { visible: true });
     await pages.type('input[type="password"]', googlePassword);
     await pages.keyboard.press('Enter');
     console.log('> Google Password entered');
 
    await sleep(8000)

    //Click on the Continue button through Keyboard button "Tab" 
    for (let i = 0; i < 5; i++) {
        await pages.keyboard.press('Tab');
    }
    await pages.keyboard.press('Enter');
    console.log('  > Clicked on "Continue" Button')
    await sleep(8000)
     

    // Click on the workspace title
    for (let i = 0; i < 10; i++) {
        await pages.keyboard.press('Tab');
    }
    await pages.keyboard.press('Enter');

    await sleep(8000)
    console.log('  > Clicked on workspace title "arbtesting"')
    console.log('Google and Slack Login Completed')

    // Save cookies to a file after successful login
    const slackCookies = await pages.cookies();

    // Update the path according to your project structure
    const cookiesPath = 'signInCookies/slackCookies.json'; // Saving cookies in the current directory  
    fs.writeFileSync(cookiesPath, JSON.stringify(slackCookies, null, 2));
    console.log('Cookies saved successfully.');

    await browser.close();
};

slackLogin().catch(console.error);
