//if the user tries to generate the summary again at the same time/day.

import puppeteer from 'puppeteer';
import logintHandler_askarb from '../../controllers/login-askarb.js';
import sleep from '../../utils/sleep.js';
import dotenv from 'dotenv';

dotenv.config();

const regenerateSummary = (async () => {
  
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
  const page = await browser.newPage();

  console.log("Begin to test the next.appreviewbot.com");

  await page.goto('https://next.appreviewbot.com/', {waitUntil: 'load'});

  console.log("> Reached target site");
  await sleep(2000);

  await page.evaluate(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });

  await sleep(10000);

  // This will navigate to the ask-arb page
  await page.waitForSelector('a[href="/ask-arb/"]');
  await page.click('a[href="/ask-arb/"]');
  console.log('> Clicked "AI Assistant(#AskARB)"')

  // This will show the URL of the navigated page.
    const expectedNavigationURL= "https://next.appreviewbot.com/ask-arb/"
    const fetchedURL = page.url()
  
    if(expectedNavigationURL === fetchedURL){
    console.log("Navigated to correct path:", expectedNavigationURL)
    }else{
      console.log('> Navigated to the incorrect URL, Navigated URL: ', fetchedURL, 'instead of navigation to URL: ', expectedNavigationURL)
      console.log('> To visit the correct URL navigating to next.appreviewbot.com')
    await page.goto('https://next.appreviewbot.com/', {waitUntil: 'load'});
    
    await sleep(10000)
    // This will navigate to the ask-arb page
    await page.waitForSelector('a[href="/ask-arb/"]');
    await page.click('a[href="/ask-arb/"]');
    console.log('Clicked on "ask-arb"')

  }
  await sleep(5000);

  // To scroll the page around the button
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const middlePosition = Math.floor(pageHeight / 3.5);
  await page.evaluate((position) => {
    window.scrollTo(0, position);
  }, middlePosition);

  await sleep(4000)
  await page.click('button[class="border border-solid space-x-5 border-green-500 rounded-md font-poppins font-bold text-white cursor-pointer mx-auto md:mx-0 mt-6 text-lg flex items-center leading-5 tracking-wider py-3 px-4 bg-green-700 w-fit "]')
  await sleep(2000)

  // Perform the login actions
  await logintHandler_askarb(page, sleep);
  await sleep(70000)

  //Module which shows the list of application and click the button to move next
  const appListSelector = 'div[class="grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1"]';
  await page.waitForSelector(appListSelector);
  await page.click(appListSelector);

  /*
  - use if require time to change the application 
  - select the aplication manually
  */
  // await sleep(10000)  

  //click on continue button
  await page.click('button[class="rs-btn rs-btn-primary"]');

  const reviewPageUrl = page.url();
  console.log('> Review Page URL: ',reviewPageUrl)

  await sleep(8000);

  //summary button
  await page.click('a[class="bg-gradient-to-r from-[#6687f5] to-[#2050D9] text-white font-light py-2.5 px-5 ml-2 rounded shadow hover:from-[#4872e4] hover:to-[#1d4fd8]"]')
  console.log('> Summary button clicked')
  await sleep(8000)

  //click on generate summary button
  await page.click('button[class="bg-gradient-to-r from-[#6687f5] to-[#2050D9] text-white font-light py-2 px-2 md:py-2 md:px-5 ml-2 rounded shadow hover:from-[#4872e4] hover:to-[#1d4fd8]"]')
  console.log('> Generate Summary button clicked')
  await sleep(10000)

  // Record the start time
  const startTime = new Date(); 

  //wait for the generated summary page to appear
  const summaryReportSelector =('div[class="w-full p-1 md:p-5"]', {waitUntil: true})
  await sleep(10000)

  if(summaryReportSelector){
    console.log('> Generated summary selector found')
  }
    const generatedSummaryURL = page.url();
   
  if (summaryReportSelector){
    console.log(' > Summary Report page found');
    console.log(' > URL of the report: ', generatedSummaryURL)
    
  } else {
    console.log(' > ERROR: something went wrong(No report)');
    }

  if (reviewPageUrl) {
    console.log(' > New summary has been generated');
    const endTime = new Date(); // Record the end time
    const responseTime = endTime - startTime;
    console.log(`> Response time: ${responseTime / 1000 % 60} seconds`);
    
  } else {
    console.log('> Summary is not generated');
    console.log('> Test fails');
  }


//condition: if user clicks the button "generate symmary" again for the same application
  console.log('  ')
  console.log('User is going to generate the summary again')
  
  await page.goto('https://beta.appreviewbot.com/app/_/reviews/summary')
  console.log(' > visited summary page')
  await sleep(5000)

  //clicks on continue button on the summary page
  await page.click('button[class="rs-btn rs-btn-primary"]');
  const URL1 = page.url()

  //check if the application is same or not
  if (URL1.includes(reviewPageUrl)) {
    console.log(' > Matched: application is same')
    await sleep(3000)
    await page.click('button[class="bg-gradient-to-r from-[#6687f5] to-[#2050D9] text-white font-light py-2 px-2 md:py-2 md:px-5 ml-2 rounded shadow hover:from-[#4872e4] hover:to-[#1d4fd8]"]', {waitUntil:summaryReportSelector })
    await sleep(20000);

    const summaryreportSelector = ('div[class="w-full p-1 md:p-5"]', {waitUntil: true})
    await sleep(5000)

    //Fetch the URL for new report
    const URL2 = page.url()

    console.log(' > Newly generated summary: ', URL2)

    if (summaryreportSelector && URL2.includes(generatedSummaryURL)) {
      console.log(' > Status: Summary Report matches with last generated summary report');
      console.log(' > Test completed')
      await sleep(5000)
      await browser.close()
    } else {
      console.log('> ERROR: something went wrong');
    }

  } else {
    console.log('> URL is different')
  }
  await sleep(5000)
  await browser.close()
})

export default regenerateSummary
