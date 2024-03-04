// //fetch the mail and extract the OTP for login

// const puppeteer = require('puppeteer')

// const clipboardy = require('clipboardy')

// const sleep = require('../utils/sleep.js')



// const fetchMailData = (async () => {

//   const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

//   const mailpages = await browser.newPage()
//   console.log('')
//   console.log('Visiting the temporary email service and getting the OTP for Login purpose')
//   const url = 'https://mailsac.com/'

//   await mailpages.goto(url, { waitUntil: 'load'})
//   console.log('> Reached the mailing site ', url)

//   await mailpages.type('input[type="text"]', 'arbtest', { delay: 100 })
//   await sleep(1000)
//   await mailpages.click('button[type="submit"]')

//   console.log('> LoggedIn into the mail')

//   // Wait for the messages list table to be visible
//   await mailpages.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
//   console.log('List of mails found')
//   await sleep(5000)

//   // Evaluate the selector to check if the second message exists
//   const secondMessageExists = await mailpages.evaluate(() => {
//     const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
//     const message = document.querySelector(selector);
//     console.log(message)
//   });

//   if (secondMessageExists) {
//     // Click the second message in the list
//     await mailpages.click('table.table.table-condensed.inbox-table tbody tr:nth-child(2)');
//     await sleep(2000)
//     console.log('> Clicked on the new mail which contain the OTP for Login');
//   } else {
//     console.log('> Mail does not exist.');
//   }
//   // Wait for the content of the mail to be visible
//   await mailpages.waitForSelector('div[ng-bind-html="trustAsHtml(msg.body)"]', { visible: true });

//   // Extract the text content of the email
//   const mailContent = await mailpages.evaluate(() => {
//     const contentElement = document.querySelector('div[ng-bind-html="trustAsHtml(msg.body)"]');
//     return contentElement ? contentElement.innerText : '';
//   });
//   console.log('')
//   console.log('----------------------------------------------')
//   console.log('Mail Content: \n\n', mailContent);
//   console.log('----------------------------------------------')
//   console.log('')

//   // Extract the OTP or any numerical code from the mail content
//   const codeMatch = mailContent.match(/\b\d{6}\b/);

//   if (codeMatch) {
//     const otpCode = codeMatch[0];
//     console.log('> Extracted OTP Code:', otpCode);
//     await sleep(2000)

//     // // Clear the clipboard by writing an empty string
//     //   clipboardy.writeSync(' ');

     
//     // Copy the OTP code to the clipboard
//     clipboardy.writeSync(otpCode);
//     console.log('> OTP code copied to clipboard.');
//     await browser.close()
//   } else {
//     console.log('> No OTP code found in the mail content.');
//   }

// })

// module.exports = fetchMailData

// const puppeteer = require('puppeteer');
// const clipboardy = require('clipboardy');
// const sleep = require('../utils/sleep.js');

// const fetchMailData = async () => {
//   try {
//     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
//     const mailpage = await browser.newPage();
//     console.log('Visiting the temporary email service and getting the OTP for Login purpose');
//     const url = 'https://mailsac.com/';
//     await mailpage.goto(url, { waitUntil: 'load' });
//     console.log('> Reached the mailing site', url);
    
//     await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
//     await sleep(1000);
//     await mailpage.click('button[type="submit"]');
//     console.log('> Logged in to the mail');
    
//     await mailpage.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
//     console.log('List of mails found');
//     await sleep(5000);

//     // const secondMessageExists = await mailpage.evaluate(() => {
//       const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
//       // return document.querySelector(selector);
//     // });

//     // if (secondMessageExists) {
//       if(selector){
//       await mailpage.click('table.table.table-condensed.inbox-table tbody tr:nth-child(2)');
//       await sleep(2000);
//       console.log('> Clicked on the new mail which contains the OTP for Login');
//     } else {
//       console.log('> Mail does not exist.');
//     }

//     // await mailpage.waitForSelector('div[ng-bind-html="trustAsHtml(msg.body)"]', { visible: true });
//     // const mailContent = await mailpage.evaluate(() => {
//     //   const contentElement = document.querySelector('div[ng-bind-html="trustAsHtml(msg.body)"]');
//     //   return contentElement ? contentElement.innerText : '';
//     // });

//     await mailpage.waitForSelector('div[ng-bind-html="trustAsHtml(msg.body)"]', { visible: true });
//     const mailContentElement = await mailpage.$('div[ng-bind-html="trustAsHtml(msg.body)"]');
//     const mailContent = mailContentElement ? await mailContentElement.evaluate(node => node.innerText) : '';
     
//     console.log('----------------------------------------------');
//     console.log('Mail Content:\n\n', mailContent);
//     console.log('----------------------------------------------');

//     const codeMatch = mailContent.match(/\b\d{6}\b/);
//     if (codeMatch) {
//       const otpCode = codeMatch[0];
//       console.log('> Extracted OTP Code:', otpCode);
//       await sleep(2000);
//       clipboardy.writeSync(otpCode);
//       console.log('> OTP code copied to clipboard.');
//     } else {
//       console.log('> No OTP code found in the mail content.');
//     }

//     await browser.close();
//   } catch (error) {
//     console.error('Error in fetchMailData:', error);
//   }
// };

// module.exports = fetchMailData;


// const puppeteer = require('puppeteer');
// const clipboardy = require('clipboardy');
// const sleep = require('../utils/sleep.js');

// const fetchMailData = async () => {
//   try {
//     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
//     const mailpage = await browser.newPage();
//     console.log('Visiting the temporary email service and getting the OTP for Login purpose');
//     const url = 'https://mailsac.com/';
//     await mailpage.goto(url, { waitUntil: 'load' });
//     console.log('> Reached the mailing site', url);
    
//     await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
//     await sleep(1000);
//     await mailpage.click('button[type="submit"]');
//     console.log('> Logged in to the mail');
    
//     await mailpage.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
//     console.log('List of mails found');
//     await sleep(5000);

//     const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
//     const secondMessageExists = await mailpage.$(selector);

//     if (secondMessageExists) {
//       await mailpage.click(selector);
//       await sleep(2000);
//       console.log('> Clicked on the new mail which contains the OTP for Login');
//     } else {
//       console.log('> Mail does not exist or selector is not found.');
//     }

//     const mailContentSelector = 'div[ng-bind-html="trustAsHtml(msg.body)"]';
//     await mailpage.waitForSelector(mailContentSelector, { visible: true });
//     const mailContentElement = await mailpage.$(mailContentSelector);
    
//     let mailContent = '';
//     if (mailContentElement) {
//       mailContent = await mailContentElement.evaluate(node => node.textContent);
//       console.log('----------------------------------------------');
//       console.log('Mail Content:\n\n', mailContent);
//       console.log('----------------------------------------------');
//     } else {
//       console.log('> Mail content not found or selector is not found.');
//     }

//     const codeMatch = mailContent.match(/\b\d{6}\b/);
//     if (codeMatch) {
//       const otpCode = codeMatch[0];
//       console.log('> Extracted OTP Code:', otpCode);
//       await sleep(2000);
//       clipboardy.writeSync(otpCode);
//       console.log('> OTP code copied to clipboard.');
//     } else {
//       console.log('> No OTP code found in the mail content.');
//     }

//     await browser.close();
//   } catch (error) {
//     console.error('Error in fetchMailData:', error);
//   }
// };

// export default fetchMailData;



import puppeteer from 'puppeteer';
import clipboardy from 'clipboardy';
import sleep from '../utils/sleep.js';

const fetchMailData = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'], defaultViewport: null });
    const mailpage = await browser.newPage();
    await mailpage.setViewport({
      width: 1920, // Set width to match screen resolution
      height: 1080, // Set height to match screen resolution
      deviceScaleFactor: 1,
    });
    console.log('Visiting the temporary email service and getting the OTP for Login purpose');
    const url = 'https://mailsac.com/';
    await mailpage.goto(url, { waitUntil: 'load' });
    console.log('> Reached the mailing site', url);
    
    await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
    await sleep(3000);
    await mailpage.keyboard.press('Enter')
    await mailpage.screenshot({ path: './screenshot1.png',fullPage: true });
    await sleep(5000)

    // await mailpage.click('button[type="submit"]');
    console.log('> Logged in to the mail');
    const emailpage= mailpage.url()
    await mailpage.screenshot({ path: './screenshot2.png',fullPage: true });
    console.log(emailpage)
    
    // await mailpage.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
    // console.log('List of mails found');
    await sleep(20000)

    const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
    // const secondMessageExists = await mailpage.$(selector);

    if (selector) {
      await mailpage.click(selector);
      await sleep(2000);
      console.log('> Clicked on the new mail which contains the OTP for Login');
    } else {
      console.log('> Mail does not exist or selector is not found.');
    }

    const mailContentSelector = 'div[ng-bind-html="trustAsHtml(msg.body)"]';
    await mailpage.waitForSelector(mailContentSelector, { visible: true });
    const mailContentElement = await mailpage.$(mailContentSelector);
    
    let mailContent = '';
    if (mailContentElement) {
      mailContent = await mailContentElement.evaluate(node => node.textContent);
      console.log('----------------------------------------------');
      console.log('Mail Content:\n\n', mailContent);
      console.log('----------------------------------------------');
    } else {
      console.log('> Mail content not found or selector is not found.');
    }

    const codeMatch = mailContent.match(/\b\d{6}\b/);
    if (codeMatch) {
      const otpCode = codeMatch[0];
      console.log('> Extracted OTP Code:', otpCode);
      await sleep(2000);
      clipboardy.writeSync(otpCode);
      console.log('> OTP code copied to clipboard.');
    } else {
      console.log('> No OTP code found in the mail content.');
    }

    await browser.close();
  } catch (error) {
    console.error('Error in fetchMailData:', error);
  }

  return otpCode
};

export default fetchMailData;
