//Login function

import fetchMailData from "../utils/fetchMailContent.js"
import clipboardy from 'clipboardy';

const logintHandler_askarb = async (page, sleep) => {

    console.log('> Login Process Initiated')

    //Enter the email ID
    await page.waitForSelector('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]')
    await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com')

    //Enter the OTP after the wait of few seconds
    await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')
    console.log(' > waiting for OTP')
    await sleep(2000)
    clipboardy.writeSync(' ');
    console.log('Cleared the clipboard')
    fetchMailData()
    await sleep(40000)
    const otpCode = clipboardy.readSync();

    await page.type('input[placeholder="OTP on your Email"]', otpCode)
    console.log(' > OTP pasted into the input field.');

    await page.click('button[type="submit"]')

    console.log(' > OTP Entered for login')

    await sleep(10000)

    const newUrl = page.url();

    // Verify if the navigation was successful
    console.log(' > Validating the URL')
    if (newUrl === 'https://beta.appreviewbot.com/app/_/reviews') {
        console.log(' > Button click navigated to the correct page && URL: ', newUrl);
        await sleep(8000)
        console.log(' > Login successful')
    } else {
        console.log(' > Button click did not navigate to the expected page.');

        // Redirecting to the login page
        console.log(' > Redirecting to the Login page')
        await page.goto('https://beta.appreviewbot.com/auth/login?redirect_to=%2Fapp%2F_%2Freviews%2Fsummary')
        await page.waitForSelector('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]')
        await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com')

        await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')
        console.log(' > waiting for OTP')
        await sleep(2000)
        clipboardy.writeSync(' ');
        console.log('Cleared the clipboard')
        fetchMailData()
        await sleep(40000)
        const otpCode = clipboardy.readSync();

        await page.type('input[placeholder="OTP on your Email"]', otpCode)
        console.log(' > OTP pasted into the input field.');
        await page.click('button[type="submit"]')

        console.log(' > OTP Entered for login again')
        console.log(' > Login Successful')

    }
}
export default logintHandler_askarb