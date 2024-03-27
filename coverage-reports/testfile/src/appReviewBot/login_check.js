//Check the Llogin and logout function in appreviewbot.com

import puppeteer from 'puppeteer';
import Arb_logintHandler from '../../controllers/loginArb .js';
import sleep from '../../utils/sleep.js';
import Arb_logoutHandler from '../../controllers/logoutArb.js';

(async () => {

    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

    const page = await browser.newPage();

    console.log("Begin to test the appreviewbot.com");

    await page.goto('https://appreviewbot.com/',{waitUntil:'load'});

    console.log("> Reached target site");

    console.log("Check the login and logout functionality for the appreviewbot.com")

    await sleep(5000);
    await Arb_logintHandler(page,sleep);
 
    await sleep(4000)
    await Arb_logoutHandler(page,sleep)
    await sleep(4000)


})()