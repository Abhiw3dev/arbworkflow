// const puppeteer = require('puppeteer-extra');
// const axios = require('axios'); // Import axios for making API calls
// const sleep = require('./utils/sleep.js');

// const fetchMailData = async () => {
    

//     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
//     const mailpage = await browser.newPage();
     
//     console.log('Visiting the temporary email service and getting the OTP for Login purpose');
//     const url = 'https://mailsac.com/';
//     await mailpage.goto(url, { waitUntil: 'load' });
//     console.log('> Reached the mailing site', url);

//     await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
//     await sleep(1000);
//     await mailpage.keyboard.press('Enter');
//     await sleep(6000);
//     console.log('> Logged in to the mail');

//     await sleep(20000);

//     const selector = 'table.table.table-condensed.inbox-table tbody tr:nth-child(2)';

//     if (selector) {
//         await mailpage.click(selector);
//         await sleep(2000);
//         console.log('> Clicked on the new mail which contains the OTP for Login');
//     } else {
//         console.log('> Mail does not exist or selector is not found.');
//     }

//     const mailContentSelector = 'div[ng-bind-html="trustAsHtml(msg.body)"]';
//     await mailpage.waitForSelector(mailContentSelector, { visible: true });

//     // Retrieve text content from the email
//     const textContent = await mailpage.evaluate(() => {
//         const mailContentElement = document.querySelector('div[ng-bind-html="trustAsHtml(msg.body)"]');
//         return mailContentElement.textContent.trim();
//     });

//     // Set up headers with your API key
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer k_zrny13BDXC9D4NpmtUUbirDNuClEPUY6DtJETP4a5' 
//     };

//     // Make API call to process text content
//     try {
//         const response = await axios.post('https://mailsac.com/api/body/arbtest@mailsac.com', { textContent }, { headers });
//         const responseData = response.data;
//         console.log('API Response:', responseData);

//         // Process the API response as needed

//     } catch (error) {
//         console.error('Error while making API call:', error.message);
//     }

//     await browser.close();
//     console.log('> Browser closed');
// };

// // Call the function to fetch mail data
// fetchMailData();



const puppeteer = require('puppeteer-extra');
const axios = require('axios'); 


const sleep = require('./utils/sleep.js'); 

const fetchMailData = async () => {
    
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null }); 

    const mailpage = await browser.newPage();

    console.log('Visiting the temporary email service and getting the OTP for Login purpose');
    const url = 'https://mailsac.com/';
    await mailpage.goto(url, { waitUntil: 'load' });
    console.log('> Reached the mailing site', url);

    await mailpage.type('input[type="text"]', 'arbtest', { delay: 100 });
    await sleep(1000);
    await mailpage.keyboard.press('Enter');
    await sleep(6000);
    console.log('> Logged in to the mail');

    await sleep(20000);

    const selector = true;

    if (selector) {
        await mailpage.click(selector);
        await sleep(2000);
        console.log('> Clicked on the new mail which contains the OTP for Login');
    } else {
        console.log('> Mail does not exist or selector is not found.');
    }


    const mailContentSelector = '';

    await mailpage.waitForSelector(mailContentSelector, { visible: true });

    const textContent = '';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'k_zrny13BDXC9D4NpmtUUbirDNuClEPUY6DtJETP4a5'
    };

    
    const apiUrl = 'https://mailsac.com/api/body/k_zrny13BDXC9D4NpmtUUbirDNuClEPUY6DtJETP4a5';

    
    try {
        const response = await axios.post(apiUrl, { textContent }, { headers });
        const responseData = response.data;
        console.log('API Response:', responseData);
    } catch (error) {
        console.error('Error while making API call:', error.message);
    }

    await browser.close();
    console.log('> Browser closed');
};


fetchMailData();
