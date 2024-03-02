// // const dismissButtonClick = require("./dismissButton");
// const puppeteerExtra = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const fs = require('fs'); // Require file system module at the top

// const sleep = require('../utils/sleep');

// puppeteerExtra.use(StealthPlugin());
// const googleAccount = async () => {
    
//     const browser = await puppeteerExtra.launch({
//         headless: false,
//         args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
//         defaultViewport: null
//     });

     
//     console.log('--> Google and Slack Login')
//     console.log(' > Initating the Google Login')
//     const googleUsername = "testarbatw3dev@gmail.com";
//     const googlePassword = "com.gmail@testarbatw3dev";

//     const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";

//     const pages = await browser.newPage()
 
//         const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
//         await pages.setUserAgent(userAgent);

//     await pages.goto(loginUrl, { waitUntil: 'load'})
 
//     await pages.type('input[type="email"]', googleUsername);
//     await pages.keyboard.press('Enter');
//     console.log('  > Google Email ID entered: ', googleUsername)
//     await sleep(8000)

//     await pages.click('input[class="whsOnd zHQkBf"]')
//     await pages.type('input[class="whsOnd zHQkBf"]', googlePassword);
//     await pages.keyboard.press('Enter');
//     console.log('  > Google Email ID Password entered: ###########', )
//     await sleep(8000)

//     console.log('  > SignIn to gmail account success ')
    
//   // Save cookies to a file after successful login
//   const googleCookies = await pages.cookies();

//   // Update the path according to your project structure
//   const cookiesPath = 'signInCookies/googleCookies.json'; // Saving cookies in the current directory  
//   fs.writeFileSync(cookiesPath, JSON.stringify(googleCookies, null, 2));
//   console.log('Cookies saved successfully.');

//   await browser.close();
// };
// googleAccount().catch(console.error);
 


const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path'); // Import path module for handling file paths
const sleep = require('../utils/sleep');

puppeteerExtra.use(StealthPlugin());

const googleAccount = async () => {
    try {
        const browser = await puppeteerExtra.launch({
            headless: false, // Run in headless mode
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: null
        });

        console.log('--> Google Login');
        console.log(' > Initiating the Google Login');

        const googleUsername = "testarbatw3dev@gmail.com";
        const googlePassword = "com.gmail@testarbatw3dev";
        const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";

        const page = await browser.newPage();

        // const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        // await page.setUserAgent(userAgent);

        await page.goto(loginUrl, { waitUntil: 'load' });

        await page.type('input[type="email"]', googleUsername);
        await page.keyboard.press('Enter');
        console.log('  > Google Email ID entered:', googleUsername);
        await sleep(10000);

        await page.click('input[class="whsOnd zHQkBf"]');
        await page.type('input[class="whsOnd zHQkBf"]', googlePassword);
        await page.keyboard.press('Enter');
        console.log('  > Google Email ID Password entered: ###########');
        await sleep(8000);

        console.log('  > Signed in to the Gmail account successfully');

         
        await page.goto('https://next.appreviewbot.com/login/')

        await page.click('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
        await sleep(22000)


  // Save cookies to a file after successful login
  const googleCookies = await page.cookies();

  // Update the path according to your project structure
  const cookiesPath = 'signInCookies/googleCookies.json'; // Saving cookies in the current directory  
  fs.writeFileSync(cookiesPath, JSON.stringify(googleCookies, null, 2));
  console.log('Cookies saved successfully.');

  await browser.close();
} catch (error) {
    console.error('Error during Google login:', error);
}
    
};

googleAccount().catch(console.error);