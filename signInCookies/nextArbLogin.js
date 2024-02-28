const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs'); // Require file system module at the top
const sleep = require('../utils/sleep');
const testarbGmailLogin = require('../utils/googleLogin');

puppeteerExtra.use(StealthPlugin());

const gmailLogin = async () => {
    const browser = await puppeteerExtra.launch({
        headless: false,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });

    const pages = await browser.newPage();
    testarbGmailLogin(pages, sleep)
    await sleep(20000)
    
    const page = await browser.newPage();
    
    const loginUrl = "https://next.appreviewbot.com/login/";

    await page.goto(loginUrl, { waitUntil: 'load' });

    await sleep(5000)

    await page.click('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
    await sleep(22000)
    const newUrl = page.url();
    console.log(' > Validating the URL for correct navigation')
    await sleep(8000)
  // Verify if the navigation was successful
    if (newUrl === 'https://next.appreviewbot.com/') {
        console.log('  > Navigated to the correct page.');
        await sleep(2000)
        console.log('  > Login successful')
    } 
    else {
        console.log('  > Not navigated to the expected page.');

        // Take a screenshot if the condition is not met
        await page.screenshot({path: 'failure_screenshot.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
        await sleep(2000)
        console.log("  > Navigating to the Login page again")
        await page.goto('https://next.appreviewbot.com/login/')
        
        await page.click('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
        await sleep(22000)
        console.log('   > Second attempt: Email entered ')
         
        await sleep(8000)
        if(newUrl.includes('https://next.appreviewbot.com/')) {
            console.log('   > Button click navigated to the correct page.');
            await sleep(2000)
            console.log('   > Second Attempt: Login successful')
         
        }else{
            // Take a screenshot if the condition is not met
        await page.screenshot({path: 'failure_screenshot.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
        console.log("Try again with correct URL") 
        }

    }

     

    // Save cookies to a file after successful login
    const nextLoginCookies = await page.cookies();

    // Update the path according to your project structure
    const cookiesPath = 'signInCookies/nextArbLoginCookies.json'; // Saving cookies in the current directory  
    fs.writeFileSync(cookiesPath, JSON.stringify(nextLoginCookies, null, 2));
    console.log('Cookies saved successfully.');

    
    await browser.close();
};

gmailLogin().catch(console.error);
