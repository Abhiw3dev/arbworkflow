
// import puppeteer from 'puppeteer';
// import clipboardy from 'clipboardy';
// import sleep from '../utils/sleep.js';

// const fetchMailData = async () => {
//   let otpCode
//   try {
//     const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'], defaultViewport: null });
//     const mailpage = await browser.newPage();
//     await mailpage.setViewport({
//       width: 1920, // Set width to match screen resolution
//       height: 1080, // Set height to match screen resolution
//       deviceScaleFactor: 1,
//     });
//     console.log('Visiting the temporary email service and getting the OTP for Login purpose');
//     const url = 'https://mailsac.com/';
//     await mailpage.goto(url, { waitUntil: 'load' });
//     console.log('> Reached the mailing site', url);

//     await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
//     await sleep(1000);
//     await mailpage.keyboard.press('Enter')
//     await sleep(6000)
//     console.log('> Logged in to the mail');
//     const emailpage = mailpage.url()
     
//     console.log(emailpage)

//     // await mailpage.waitForSelector('table.table.table-condensed.inbox-table', { visible: true });
//     // console.log('List of mails found');
//     await sleep(20000)

//     const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';
//     // const secondMessageExists = await mailpage.$(selector);

//     if (selector) {
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
//       return otpCode
//     } else {
//       console.log('> No OTP code found in the mail content.');
//     }

//     await browser.close();
//     console.log('> browser closed')
//   } catch (error) {
//     console.error('Error in fetchMailData:', error);
//   }

// };

// export default fetchMailData;


const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');
const sleep = require('../utils/sleep.js');

const fetchMailData = async () => {
     
    
      const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
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
      await sleep(1000);
      await mailpage.keyboard.press('Enter')
      await sleep(6000)
      console.log('> Logged in to the mail');
      const emailpage = mailpage.url()
       
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
        return otpCode
      } else {
        console.log('> No OTP code found in the mail content.');
      }
  
      await browser.close();
      console.log('> browser closed')
     
  
  };
  
module.exports = fetchMailData;



 