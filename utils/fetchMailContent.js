//fetch the mail and extract the OTP for login
// import puppeteer from 'puppeteer';
const puppeteer =require('puppeteer')
// import clipboardy from 'clipboardy';
const clipboardy = require('clipboardy')
// import sleep from './sleep.js';
const sleep = require('../utils/sleep.js')

 

const fetchMailData = (async () => {

  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
   
  const mailpages = await browser.newPage()
  console.log('')
  console.log('Visiting the temporary email service and getting the OTP for Login purpose')
  const url = 'https://mailsac.com/'
 
  await mailpages.goto(url, { waitUntil: 'load' })
  console.log('> Reached the mailing site ', url)

  await mailpages.type('input[type="text"]', 'arbtest', { delay: 100 })
  await sleep(1000)
  await mailpages.click('button[type="submit"]')
   
  console.log('> LoggedIn into the mail')

  // Wait for the messages list table to be visible
  await mailpages.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
  await sleep(5000)
   
  // Evaluate the selector to check if the second message exists
    const secondMessageExists = await mailpages.evaluate(() => {
    const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
    const message = document.querySelector(selector);
    return Boolean(message); // Returns true if the element exists, false otherwise
  });
 
  if (secondMessageExists) {
    // Click the second message in the list
    await mailpages.click('table.table.table-condensed.inbox-table tbody tr:nth-child(2)');
    await sleep(4000)
    console.log('> Clicked on the new mail which contain the OTP for Login');
  } else {
    console.log('> Mail does not exist.');
  }
  // Wait for the content of the mail to be visible
  await mailpages.waitForSelector('div[ng-bind-html="trustAsHtml(msg.body)"]', { visible: true });

  // Extract the text content of the email
    const mailContent = await mailpages.evaluate(() => {
    const contentElement = document.querySelector('div[ng-bind-html="trustAsHtml(msg.body)"]');
    return contentElement ? contentElement.innerText : '';
  });
  console.log('')
  console.log('----------------------------------------------')
  console.log('Mail Content: \n\n', mailContent);
  console.log('----------------------------------------------')
  console.log('')

  // Extract the OTP or any numerical code from the mail content
  const codeMatch = mailContent.match(/\b\d{6}\b/);  

  if (codeMatch) {
    const otpCode = codeMatch[0];
    console.log('> Extracted OTP Code:', otpCode);
    await sleep(2000)

    // // Clear the clipboard by writing an empty string
    //   clipboardy.writeSync(' ');

      await sleep(2000)
    // Copy the OTP code to the clipboard
    clipboardy.writeSync(otpCode);
    console.log('> OTP code copied to clipboard.');
    await browser.close()
  } else {
    console.log('> No OTP code found in the mail content.');
  }

})

module.exports= fetchMailData
