 
const sleep = require('../../utils/sleep.js')
 

//Login function for nextAppReviewBot

const Next_GoogleLogintHandler = async (page) => {
    // const loginButton= 'a[class="text-xs md:text-base px-2 py-1 border-none text-black "]'
    // await page.click(loginButton)
    // console.log('  > Login button clicked')
    await sleep(10000)
    // await page.click('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
    // console.log('  > Login with google clicked')

    for(let i=0; i<6; i++){
        await page.keyboard.press('Tab');
    }
    await page.keyboard.press('Enter');

    await sleep(40000)
    const newUrl = page.url();
    console.log('Navigated page url',newUrl)
    console.log(' > Validating the URL for correct navigation')
  // Verify if the navigation was successful
    if (newUrl === 'https://next.appreviewbot.com/') {
        console.log('  > Navigated to the correct page.', newUrl);
        await sleep(2000)
        console.log('  > Login successful')
        // Take a screenshot if the condition is not met
        await page.screenshot({path: 'pass_screenshot1.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
    } 
    else {
        console.log('  > Not navigated to the expected page.');
        await sleep(5000)
        // Take a screenshot if the condition is not met
        await page.screenshot({path: 'arbfailure_screenshot1.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
        console.log("  > Navigating to the Login page again")
        await page.goto('https://next.appreviewbot.com/login/')

        await sleep(8000)
        // await page.click('button[class="my-2 w-max bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-red-300 focus:outline-none text-gray-800 text-sm font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors duration-200"]')
        // await sleep(30000)
        for(let i=0; i<6; i++){
            await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter');
    
        await sleep(40000)
        const secondnewUrl = page.url();
        console.log('navigated URL at second time',secondnewUrl)

        console.log('   > Second attempt: Email entered ')
         
        await sleep(8000)
        if(secondnewUrl.includes('https://next.appreviewbot.com/')) {
            console.log('   > Button click navigated to the correct page.');
            await sleep(2000)
            console.log('   > Second Attempt: Login successful')
            // Take a screenshot if the condition is not met
        await page.screenshot({path: 'pass_screenshot2.png', fullPage: true});
        console.log('Screenshot taken and saved as failure_screenshot.png');
         
        }else{

        // Take a screenshot if the condition is not met
            await page.screenshot({path: 'arbfailure_screenshot2.png', fullPage: true});
            console.log('Screenshot taken and saved as failure_screenshot.png');
            console.log("Try again with correct URL") 


        }

    }
}

module.exports = Next_GoogleLogintHandler