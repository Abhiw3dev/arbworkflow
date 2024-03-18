const puppeteer = require('puppeteer');
const fs = require('fs'); // Require file system module at the top
const sleep = require('../utils/sleep');
 
const arbLogin = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });
 
    const page = await browser.newPage();
    
    const loginUrl = "https://appreviewbot.com/";

    await page.goto(loginUrl, { waitUntil: 'load' });

    await sleep(5000)
    const loginButton = 'a[class="nav__button nav__button--link"]'
    await page.click(loginButton)
    console.log('> Login button clicked')

    //login credentials
    await page.type('input[type="email"]', 'testing00@gmail.com', { delay: 150 })
    await sleep(1000)
    await page.type('input[type="password"]', 'testing00', { delay: 150 })
    await sleep(1000)
    console.log("> login credentials entered")

    //submit button
    await page.click('input[type="submit"]')
    console.log('clicked 1st time')
     
    await sleep(10000)
    const newUrl = page.url();
    console.log(' > Validating the URL for correct navigation')
    await sleep(8000)
  // Verify if the navigation was successful
    if (newUrl === 'https://appreviewbot.com/') {
        console.log('  > Navigated to the correct page.');
        await sleep(2000)
        console.log('  > Login successful')
    } 
    else {
        console.log('  > Not navigated to the expected page.');

        // Take a screenshot if the condition is not met
        await page.screenshot({path: 'failure_screenshot.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
        console.log("Try again with correct URL") 
        }

 
    // Save cookies to a file after successful login
    const arbLoginCookies = await page.cookies();

    // Update the path according to your project structure
    const cookiesPath = 'signInCookies/arbLoginCookies.json'; // Saving cookies in the current directory  
    fs.writeFileSync(cookiesPath, JSON.stringify(arbLoginCookies, null, 2));
    console.log('Cookies saved successfully.');

    
    await browser.close();
};

arbLogin().catch(console.error);



 