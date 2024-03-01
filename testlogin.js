// const puppeteer = require('puppeteer-extra');

// const sleep = require('./utils/sleep');


// const fs = require('fs');
// const cookiesSlackPath = './signInCookies/nextArbLoginCookies.json'


// const logintest = async () => {

//     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
    
     
//         const page = await browser.newPage();
//         const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
        
//             await page.setCookie(...cookies);
        
//         console.log('Cookies loaded successfully.');


 
//     await sleep(10000)
    
//     console.log('Visiting the  arb to test the cookie login');
//     const url = 'https://next.appreviewbot.com/';
//     await page.goto(url, { waitUntil: 'load' });
//     console.log('> Reached the site', url);

    


// }; logintest()



const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const sleep = require('./utils/sleep');
const fs = require('fs');
const cookiesSlackPath = './signInCookies/googleCookies.json';

// const puppeteerExtra = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const sleep = require('./utils/sleep');


const logintest = async () => {
    const browser = await puppeteerExtra.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
    try {
        puppeteerExtra.use(StealthPlugin());
        const pages = await browser.newPage();
        if (fs.existsSync(cookiesSlackPath)) {
            const cookiesString = fs.readFileSync(cookiesSlackPath, 'utf-8');
            const cookies = JSON.parse(cookiesString);
            for (let cookie of cookies) {
                await pages.setCookie(cookie);
            }
            console.log('Cookies loaded successfully.');
            
        } else {
            console.log('Cookies file not found. Ensure the path is correct:', cookiesSlackPath);
            // Consider adding login logic here if cookies don't exist
        }

        await pages.goto('https://google.com/')
        await sleep(20000)
        const page = await browser.newPage();
        await page.goto('https://next.appreviewbot.com/login');
        console.log('> Reached the site:', 'https://next.appreviewbot.com/');
        await sleep(8000)

        const googleButton = ('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
        
        
        
    } catch (error) {
        console.error('Error during the login test:', error);
    } finally {
        console.log('....')
    }
};

logintest().catch(console.error);
