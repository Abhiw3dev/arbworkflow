//check the login and logout functionality for the next.appreviewbot.com

import puppeteer from 'puppeteer'; 
import logoutHandler from '../../controllers/logoutNextArb.js';
import sleep from '../../utils/sleep.js';
import logintHandler from '../../controllers/loginNextArb.js';

(async () => {

    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

    const page = await browser.newPage();
    console.log("Check the login and logout functionality for the next.appreviewbot.com")

    console.log("Begin to test the appreviewbot.com");

    await page.goto('https://next.appreviewbot.com/');

    console.log("> Reached target site");

    
    await sleep(5000);

    //check if the user is logged in or not and if not then let the user to login the account.
    // If loginButton is present, logout and then login.
    const loginButton= 'a[class="text-xs md:text-base px-2 py-1 border-none text-black "]'
    const accountButtonUrl = 'div[class="dropdown dropdown-end"]'
 
    if (loginButton) {
        console.log("> Login button is present")
        await logintHandler(page,sleep);

    } else if(accountButtonUrl) {
            console.log("> Profile/account button is present")
            await logoutHandler(page, sleep);
            await sleep(2000)
            console.log(" > Logout success") 
            await logintHandler(page, sleep);
            console.log(" > Login success") 
             
        }else{
            console.log('ERROR: Element not found');
        }
    
    await sleep(4000)
    await logoutHandler(page, sleep)
    await sleep(4000)

    await browser.close()


})()

 