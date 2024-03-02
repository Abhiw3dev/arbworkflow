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
const cookiesPath = './signInCookies/googleCookies.json';

const logintest = async () => {
    try {
        puppeteerExtra.use(StealthPlugin());
        const browser = await puppeteerExtra.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
      
        const page = await browser.newPage();

        if (fs.existsSync(cookiesPath)) {
            try {
                const cookiesString = fs.readFileSync(cookiesPath, 'utf-8');
                const cookies = JSON.parse(cookiesString);
        
                // Iterate over each cookie and set it individually
                for (const cookie of cookies) {
                    await page.setCookie(cookie);
                }
        
                console.log('Cookies loaded successfully.');
            } catch (error) {
                console.error('Error loading and setting cookies:', error);
            }
        } else {
            console.log('Cookies file not found. Ensure the path is correct:', cookiesPath);
            // Consider adding login logic here if cookies don't exist
        }
        
        await sleep(15000)
        // Navigate to the target URL
        await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=en&ifkv=ATuJsjyGk2t1VaMEDrvqid45Gfryj3xGi_4nR8NWb0txuDJU4Wx9zCLRgV9MTIm_r8WNXPOdCsHg&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-721165568%3A1709375210236235&theme=glif');
        console.log('> Reached the site:', 'https://next.appreviewbot.com/');
        await sleep(8000);
        
    
   
        // Add your further logic here

    } catch (error) {
        console.error('Error during the login test:', error);
    } finally {
        console.log('Test completed.');
    }
};

logintest().catch(console.error);

 