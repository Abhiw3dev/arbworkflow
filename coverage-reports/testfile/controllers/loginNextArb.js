// import fetchMailData from '../../utils/fetchMailContent.js';
const fetchMailData = require('../../utils/fetchMailContent.js')
const clipboardy = require('clipboardy')
const sleep = require('../../utils/sleep.js')
 

//Login function for nextAppReviewBot

const Next_logintHandler = async (page) => {
    const loginButton= 'a[class="text-xs md:text-base px-2 py-1 border-none text-black "]'
    await page.click(loginButton)
    
    await page.waitForSelector('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]')
    await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com')
    
    await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')
    console.log(' > Email Entered and clicked on button to proceed')
    console.log(' > Waiting for the OTP received at email')
    await sleep(15000)
    clipboardy.writeSync(' ');
    console.log('clipboard is cleared before starting with OTP fetching')
    fetchMailData()
    await sleep(40000)
    const otpCode = clipboardy.readSync();
    
    await page.type('input[placeholder="OTP on your Email"]', otpCode)
    console.log(' > OTP pasted into the input field.');
    
    await sleep(2000)
    await page.click('button[type="submit"]')

    console.log(' > OTP Entered for login and clicked on "Submit" button')
    
    await sleep(8000)

    const newUrl = page.url();
    console.log(' > Validating the URL for correct navigation')
  // Verify if the navigation was successful
    if (newUrl === 'https://next.appreviewbot.com/') {
        console.log('  > Navigated to the correct page.');
        await sleep(2000)
        console.log('  > Login successful')
    } 
    else {
        console.log('  > Not navigated to the expected page.');
        await sleep(2000)
        console.log("  > Navigating to the Login page again")
        await page.goto('https://next.appreviewbot.com/login/', {timeout: 60000})
        await page.waitForSelector('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]')
        await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com')
        console.log('   > Second attempt: Email entered ')
        await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')
        console.log('   > Second attempt: Waiting for the OTP received at email')
        await sleep(15000)
        fetchMailData()
        await sleep(40000)
        const otpCode = clipboardy.readSync();
        await page.waitForSelector('input[placeholder="OTP on your Email"]')
        await page.type('input[placeholder="OTP on your Email"]', otpCode)
        console.log('   > OTP pasted into the input field.');

        await page.click('button[type="submit"]')

        console.log('   > Second attempt: OTP Entered for login')
        await sleep(8000)
        if(newUrl.includes('https://next.appreviewbot.com/')) {
            console.log('   > Button click navigated to the correct page.');
            await sleep(2000)
            console.log('   > Second Attempt: Login successful')
         
        }else{
        console.log("Try again with correct URL") 
        }

    }
}

module.exports = Next_logintHandler