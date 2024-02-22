// user generates the summary for the first time/attempt.

import puppeteer from 'puppeteer';
import logintHandler_askarb from '../../controllers/login-askarb.js';
import sleep from '../../utils/sleep.js';
import dotenv from 'dotenv';

dotenv.config();

const generateSummary = (async () => {

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

  const page = await browser.newPage();

  console.log("Begin to test the next.appreviewbot.com");

  // target site
  await page.goto('https://next.appreviewbot.com/', { waitUntil: "load" });

  console.log("> Reached target site");

  await sleep(2000);

  await page.evaluate(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });

  await sleep(10000)
  //   await page.waitForSelector('a[href="/ask-arb/"]')
  await page.click('a[href="/ask-arb/"]', { delay: 70 })
  console.log('> Clicked "AI Assistant(#AskARB)"')

  await sleep(2000)
  // This will show the URL of the navigated page.

  const expectedNavigationURL = "https://next.appreviewbot.com/ask-arb/"
  const fetchedURL = page.url()

  if (expectedNavigationURL === fetchedURL) {
    console.log("> Navigated to correct path:", expectedNavigationURL)
  } else {
    console.log('> Navigated to the incorrect URL, Navigation Error: ', fetchedURL)
    console.log('> To visit the correct URL navigating to next.appreviewbot.com')
    await page.goto('https://next.appreviewbot.com/', { waitUntil: 'load' });
    await sleep(5000)

    // This will navigate to the ask-arb page
    await page.waitForSelector('a[href="/ask-arb/"]');
    await page.click('a[href="/ask-arb/"]');
    console.log('Clicked on "ask-arb"')

  }

  await sleep(5000)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const middlePosition = Math.floor(pageHeight / 3.5);
  await page.evaluate((position) => {
    window.scrollTo(0, position, { behavior: 'smooth' });
  }, middlePosition);

  // click on the button "Check it out" under "Summarize Review"
  await page.click('button[class="border border-solid space-x-5 border-green-500 rounded-md font-poppins font-bold text-white cursor-pointer mx-auto md:mx-0 mt-6 text-lg flex items-center leading-5 tracking-wider py-3 px-4 bg-green-700 w-fit "]')
  console.log('> Click on the button "Check it out" under "Summarize Review"')
  await sleep(2000)

  const navigatedPageUrl = await page.url()
  const loginPageUrl = 'https://beta.appreviewbot.com/auth/login?redirect_to=%2F'
  if (navigatedPageUrl.includes(loginPageUrl)) {
    console.log('> Navigated to the correct page and Login initiated')
  }

  // Perfrom the login actions
  console.log('> Processing with the login credentials')
  await logintHandler_askarb(page, sleep)
  await sleep(70000)


  //Module which shows the list of application and click the button to move next
  const appListSelector = 'div[class="grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1"]';
  await page.waitForSelector(appListSelector);
  await page.click(appListSelector);
  console.log('Application is selected for generating the summary')

  /*
  - use if require time to change the application 
  - select the aplication manually
  */
  // await sleep(10000)  


  await page.click('button[class="rs-btn rs-btn-primary"]')
  await sleep(4000)
  console.log('Reached Reviews page')
  await page.click('a[class="bg-gradient-to-r from-[#6687f5] to-[#2050D9] text-white font-light py-2.5 px-5 ml-2 rounded shadow hover:from-[#4872e4] hover:to-[#1d4fd8]"]')
  await sleep(4000)
  console.log('Clicked on "Summarize" button on reviews page')
  await page.click('button[class="bg-gradient-to-r from-[#6687f5] to-[#2050D9] text-white font-light py-2 px-2 md:py-2 md:px-5 ml-2 rounded shadow hover:from-[#4872e4] hover:to-[#1d4fd8]"]')
  console.log('Clicked on "Generate Summary" button on summary page')
  const startTime = new Date(); // Record the start time

  const summaryreport = ('div[class="w-full p-1 md:p-5"]')
  await page.waitForSelector(summaryreport);
  console.log('Waiting for the new summary page')

  if (summaryreport) {
    console.log('> Report page found')
  } else {
    console.log('> ERROR: something went wrong')
  }

  const newUrl = page.url();

  if (newUrl) {
    console.log(`> New summary has been generated && URL fetched(${newUrl})`)
    const endTime = new Date(); // Record the end time

    const responseTime = endTime - startTime;
    console.log(`> Response time: ${responseTime / 1000 % 60} seconds`);

  } else {
    console.log('> Summary is not generated')

    console.log('> Test Fails')
  }
  await sleep(5000)
  await browser.close()

})


export default generateSummary