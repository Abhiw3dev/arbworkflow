// Check the login session that if user is able to login, search app, integrate, alerts if appears.
//Condition: if page is reloaded by the end user after the integration alert message

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import logintHandler from '../../controllers/loginNextArb.js';
import sleep from '../../utils/sleep.js';
import dotenv from 'dotenv';
import testarbGmailLogin from '../../utils/googleLogin.js';
import clipboardy from 'clipboardy';


 

(async () => {
 

  dotenv.config();
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

  const pages = await browser.newPage();

  testarbGmailLogin(pages, sleep)
  await sleep(90000)

  const page = await browser.newPage();

  console.log("Begin to test the next.appreviewbot.com");

  // target site
  await page.goto('https://next.appreviewbot.com/', { waitUntil: "load" });

  console.log("> Reached target site");

  await sleep(2000);

  // Clear the clipboard by writing an empty string
  clipboardy.writeSync(' ');
  console.log('clipboard is cleared before starting with login process')


  // Perfrom the login actions
  await logintHandler(page, sleep)

  await sleep(2000)

  //search for the applicaiton name
  await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
  await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
  console.log('> An application is searched ')
  //wait for the search result to appear
  await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');

  //clicks on one of the search results
  await page.click('span[class="flex items-center w-11/12 cursor-pointer"]')
  console.log('> Selected a result from the search result ')
  await sleep(2000)

  //click on "Add to slack"
  await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]')
  console.log('> Clicked on "Add to Slack" ')
  await sleep(15000)

  //select the channel name in the slack where user wants to receive the reviews of the application
  await page.type('input[placeholder="Search for a channel..."]', 'arb')
  console.log('> Selected the channel name for integration of the application')
  await page.keyboard.press('Enter')
  await sleep(2000)
 
  // Press the "Allow" button using the keyboard function
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
  }
  await page.keyboard.press('Enter')
  console.log("> Allow button is pressed")
  await sleep(25000)

// get the innertext of the alerts
  const innerText = await page.evaluate(() => {
    const targetElement = document.querySelector('div[class="container py-10"]');
    return targetElement ? targetElement.innerText.trim() : null;
  });

  if(innerText){
    console.log('> Fetched Inner Text:', `"${innerText}"`);
  }else{
    console.log('> Element not found or has no inner text.');
  }

  //alert messages
  const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan";
  const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";
  const message_3 = "Error Communicating with Slack Server. Please reach out to support. Contact Us"

  //condition to check for the alert message
  if (innerText.includes(message_1)) {
    console.log("> Integration not successful, it requires upgrading the plan");
  } else if (innerText.includes(message_2)) {
    console.log('> Integration successful');
  } else {
    console.log('> Error message: ', innerText);
  }

  await sleep(8000)


//Condition: if page is reloaded by the end user
  const pageReload = await page.reload()
  if (pageReload) {
    const alertSelector = 'div[class="alert alert-error "]';
    await page.waitForSelector(alertSelector);
    const reloadError = await page.evaluate(() => {
      const reloadErrorMessage = document.querySelector('div[class="alert alert-error "]');
      return reloadErrorMessage ? reloadErrorMessage.innerText.trim() : null;

    });
    if (reloadError.includes(message_3)) {
      console.log('> Reload Error: ', reloadError)
      console.log('> Page has been reloaded by the end-user')
      console.log('> Previous status was: ', innerText)
    }
  }
  await browser.close()

})()