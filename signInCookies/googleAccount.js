// const dismissButtonClick = require("./dismissButton");
const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs'); // Require file system module at the top

const sleep = require('../utils/sleep');

puppeteerExtra.use(StealthPlugin());
const googleAccount = async () => {

    const browser = await puppeteerExtra.launch({
        headless: true,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });

    

    console.log('--> Google and Slack Login')
    console.log(' > Initating the Google Login')
    const googleUsername = "testarbatw3dev@gmail.com";
    const googlePassword = "com.gmail@testarbatw3dev";

    const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";

    const pages = await browser.newPage()
 
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        await pages.setUserAgent(userAgent);

    await pages.goto(loginUrl, { waitUntil: 'load'})
 
    await pages.type('input[type="email"]', googleUsername);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID entered: ', googleUsername)
    await sleep(8000)

    await pages.click('input[class="whsOnd zHQkBf"]')
    await pages.type('input[class="whsOnd zHQkBf"]', googlePassword);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID Password entered: ###########', )
    await sleep(8000)

    console.log('  > SignIn to gmail account success ')
    
//   // Save cookies to a file after successful login
//   const googleCookies = await pages.cookies();

//   // Update the path according to your project structure
//   const cookiesPath = 'signInCookies/googleCookies.json'; // Saving cookies in the current directory  
//   fs.writeFileSync(cookiesPath, JSON.stringify(googleCookies, null, 2));
//   console.log('Cookies saved successfully.');

  await browser.close();
};
googleAccount().catch(console.error);
 


