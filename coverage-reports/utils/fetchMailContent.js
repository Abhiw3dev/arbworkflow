 
// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const clipboardy = require('clipboardy');
// const sleep = require('../utils/sleep.js');

// const fetchMailData = async () => {
//     puppeteer.use(StealthPlugin());

//     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
//     const mailpage = await browser.newPage();
//     await mailpage.setViewport({
//         width: 1920,  
//         height: 1080,  
//         deviceScaleFactor: 1,
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

//     await sleep(20000)

//     const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';

//     if (selector) {
//         await mailpage.click(selector);
//         await sleep(2000);
//         console.log('> Clicked on the new mail which contains the OTP for Login');

//         const mailContentSelector = 'div[ng-bind-html="trustAsHtml(msg.body)"]';
//         await mailpage.waitForSelector(mailContentSelector, { visible: true });

//         await mailpage.focus(mailContentSelector);
//         await mailpage.keyboard.down('Control');
//         await mailpage.keyboard.press('KeyA');
//         await mailpage.keyboard.up('Control');
//         console.log('text selected')

//         await sleep(1000)
//         await mailpage.keyboard.down('Control');
//         await mailpage.keyboard.press('KeyC');
//         await mailpage.keyboard.up('Control');
//         console.log('text copied')
//         await sleep(2000)
//         await mailpage.screenshot({ path: './textselected.png', fullPage: true });

//         const copiedText = clipboardy.readSync();
//         console.log('Copied text:', copiedText);

//         const codeMatch = copiedText.match(/\b\d{6}\b/);
//         if (codeMatch) {
//             const otpCode = codeMatch[0];
//             console.log('> Extracted OTP Code:', otpCode);
//             await sleep(2000);
//             clipboardy.writeSync(otpCode);
//             console.log('> OTP code copied to clipboard.');
//             await browser.close(); // Close browser after extracting OTP code
//             return otpCode;
//         } else {
//             console.log('> No OTP code found in the mail content.');
//         }
//     } else {
//         console.log('> Mail does not exist or selector is not found.');
//     }

//     await browser.close(); // Close browser if no OTP code is found
//     console.log('> Browser closed');
// };

// module.exports = fetchMailData;


 
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const clipboardy = require('clipboardy');
const fs = require('fs');
const sleep = require('../utils/sleep.js');

const fetchMailData = async () => {
    puppeteer.use(StealthPlugin());

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
    await sleep(1000);
    await mailpage.keyboard.press('Enter')
    await sleep(6000)
    console.log('> Logged in to the mail');
    const emailpage = mailpage.url()

    console.log(emailpage)

    await sleep(20000)

    const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';

    if (selector) {
        await mailpage.click(selector);
        await sleep(2000);
        console.log('> Clicked on the new mail which contains the OTP for Login');

        const mailContentSelector = 'div[ng-bind-html="trustAsHtml(msg.body)"]';
        await mailpage.waitForSelector(mailContentSelector, { visible: true });

        
        // Use evaluate function to get the innerText of the mail content
        const mailContentInnerText = await mailpage.evaluate((selector) => {
          const element = document.querySelector(selector);
          return element ? element.innerText : null;
        }, mailContentSelector);

      console.log('Mail Content Inner Text:', mailContentInnerText);


        await mailpage.focus(mailContentSelector);
        await mailpage.keyboard.down('Control');
        await mailpage.keyboard.press('KeyA');
        await mailpage.keyboard.up('Control');
        console.log('text selected')

        
      //   await sleep(4000)
      //   await mailpage.keyboard.down('Control');
      //   await mailpage.keyboard.press('KeyC');
      //   await mailpage.keyboard.up('Control');
      //   console.log('text copied')
      //   await sleep(2000)
      //   await mailpage.screenshot({ path: './textselected.png', fullPage: true });

      //   const copiedText = clipboardy.readSync();
      //   console.log('Copied text:', copiedText);

      //   // Write the copied text to a file
      //   fs.writeFile('copiedText.txt', copiedText, (err) => {
      //     if (err) {
      //         console.error('Error writing file:', err);
      //     } else {
      //         console.log('Copied text written to file: copiedText.txt');
      //     }
      // });

    

        const codeMatch = mailContentInnerText.match(/\b\d{6}\b/);
        if (codeMatch) {
            const otpCode = codeMatch[0];
            console.log('> Extracted OTP Code:', otpCode);
            await sleep(2000);
            clipboardy.writeSync(otpCode);
            console.log('> OTP code copied to clipboard.');
            await browser.close(); // Close browser after extracting OTP code
            return otpCode;
        } else {
            console.log('> No OTP code found in the mail content.');
        }
    } else {
        console.log('> Mail does not exist or selector is not found.');
    }

    await browser.close(); // Close browser if no OTP code is found
    console.log('> Browser closed');
};
 

module.exports = fetchMailData;
