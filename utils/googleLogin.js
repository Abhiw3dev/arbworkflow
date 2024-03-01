// const dismissButtonClick = require("./dismissButton");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const testarbGmailLogin = (async (pages, sleep) => {
    
    console.log('--> Google and Slack Login')
    console.log(' > Initating the Google Login')
    const googleUsername = "testarbatw3dev@gmail.com";
    const googlePassword = "com.gmail@testarbatw3dev";

    const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";
    puppeteerExtra.use(StealthPlugin());

    await pages.goto(loginUrl, { waitUntil: 'load'})
 
    await pages.type('input[type="email"]', googleUsername);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID entered: ', googleUsername)
    await sleep(10000)

    await pages.click('input[class="whsOnd zHQkBf"]')
    await pages.type('input[class="whsOnd zHQkBf"]', googlePassword);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID Password entered: ###########', )
    await sleep(8000)

    console.log('  > SignIn to gmail account success ')

     
  
//     const loginUrl = "https://next.appreviewbot.com/login/";

//     await page.goto(loginUrl, { waitUntil: 'load' });

//     await sleep(5000)

//     await page.type('input[placeholder="pat@saturn.dev"]', 'testarbatw3dev@gmail.com')
//     await page.keyboard.press('Enter')

//     await sleep(60000)

//     //verify OTP button
//     await page.click('button[class="relative group block w-full  py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#5469D4] rounded overflow-hidden null"]')

//     await sleep(10000)
//     const newUrl = page.url();
//     console.log(' > Validating the URL for correct navigation')
//     await sleep(8000)
//   // Verify if the navigation was successful
//     if (newUrl === 'https://next.appreviewbot.com/') {
//         console.log('  > Navigated to the correct page.');
//         await sleep(2000)
//         console.log('  > Login successful')
//     } 
//     else {
//         console.log('  > Not navigated to the expected page.');

//         // Take a screenshot if the condition is not met
//         await page.screenshot({path: 'loginfail_screenshot.png', fullPage: true});
//         console.log('Screenshot taken and saved as failure_screenshot.png');
//         await sleep(2000)
        
//     }
     

//      await page.goto('https://next.appreviewbot.com/')
//      console.log('visited the arb site')

//     // Save cookies to a file after successful login
//     const nextLoginCookies = await page.cookies();

//     // Update the path according to your project structure
//     const cookiesPath = 'signInCookies/nextArbLoginCookies.json'; // Saving cookies in the current directory  
//     fs.writeFileSync(cookiesPath, JSON.stringify(nextLoginCookies, null, 2));
//     console.log('Cookies saved successfully.');

//     await sleep(5000)
//     await browser.close();
    
 
})

module.exports =  testarbGmailLogin


