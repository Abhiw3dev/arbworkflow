
// Check the login session that if user is able to login, search app, integrate, alerts if appears.
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import logintHandler from '../../controllers/loginNextArb.js';
import sleep from '../../utils/sleep.js';
import dotenv from 'dotenv';
import testarbGmailLogin from '../../utils/googleLogin.js';
import clipboardy from 'clipboardy';


const firstUserFlow = (async () => {
  dotenv.config();
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

  console.log('login the gmail account')

  const pages = await browser.newPage();

  testarbGmailLogin(pages, sleep)
  await sleep(90000)

  const page = await browser.newPage();

  console.log("Begin to test the next.appreviewbot.com");

  // target site
  await page.goto('https://next.appreviewbot.com/', { waitUntil: 'load' });

  console.log("> Reached target site");

  await sleep(5000);

  // Perfrom the login actions
  console.log('> Initiating the Login Process ')

  // Clear the clipboard by writing an empty string
  clipboardy.writeSync(' ');
  console.log('clipboard is cleared before starting with login process')

  //AppreviewBot Login
  await logintHandler(page, sleep)

  await sleep(4000)

  //search for the applicaiton name
  await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
  await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
  console.log('> An application is searched ')

  //wait for the search result to appear
  await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');

  //clicks on one of the search results
  await page.click('span[class="flex items-center w-11/12 cursor-pointer"]')
  console.log('> Selected a result from the search result ')
  await sleep(5000)

  //click on "Add to slack"
  await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]')
  console.log('> Clicked on "Add to Slack" ')
  await sleep(10000) 


  //select the channel name in the slack where user wants to receive the reviews of the application
  await page.type('input[class="c-input_text c-select_input"]', 'arb')
  await sleep(2000)
  console.log(' > Selected a channel for integration')
 
  //select slack-channel
  await page.keyboard.press('Enter')

  await sleep(2000)
  const allowButton = 'button[class="c-button c-button--primary c-button--medium"]'
  await page.waitForSelector(allowButton, { visible: true })

  //click the "Allow" button
  for (let i = 0; i < 5; i++) {
    await pages.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter')
  console.log(' > Clicked on "Allow" button')

  await sleep(25000)
  console.log(' > Waiting for few seconds until Alerts to appear')
  // get the innertext of the alerts
  const innerText = await page.evaluate(() => {
    const targetElement = document.querySelector('div[class="container py-10"]');
    return targetElement ? targetElement.innerText.trim() : null;
  });
  //alert messages
 
  const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan";
  const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";
  // Normalize and trim the innerText and messages for reliable comparison
  const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
  const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
  const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

  console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);
  console.log(' ');
  
  // Check for alert messages
  if (normalizedInnerText.includes(normalizedMessage_1)) {
    console.log("  > Integration not successful, it requires upgrading the plan");
    console.log(' ');
  } else if (normalizedInnerText.includes(normalizedMessage_2)) {
    console.log('  > Integration successful');
    console.log(' ');
  } else {
    console.log('  > Unexpected message:', normalizedInnerText);
    console.log(' ');
  }

  await sleep(5000)
  await browser.close()

})



export default firstUserFlow