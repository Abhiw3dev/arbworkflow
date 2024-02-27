const dismissButtonClick = require("./dismissButton");

const testarbGmailLogin = (async (pages, sleep) => {
    console.log('--> Google and Slack Login')
    console.log(' > Initating the Google Login')
    const googleUsername = "testarbatw3dev@gmail.com";
    const googlePassword = "com.gmail@testarbatw3dev";

    const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";

    await pages.goto(loginUrl, { waitUntil: 'load'})
 
    await pages.type('input[type="email"]', googleUsername);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID entered: ', googleUsername)
    await sleep(8000)

    await pages.click('input[class="whsOnd zHQkBf"]')
    await pages.type('input[class="whsOnd zHQkBf"]', googlePassword);
    await pages.keyboard.press('Enter');
    console.log('  > Google Email ID Password entered: ###########', )
    await sleep(10000)

    console.log('  > SignIn to gmail account success ')
    

    console.log('> Initating the Slack Login')
    await pages.goto('https://slack.com/intl/en-in/connect', { waitUntil: 'load', timeout: 40000 })
    console.log('  > Visited the Slack official page')

    await pages.click('a[class="c-button v--left v--primary"]')
    console.log('  > Clicked on "Try For Free" Button')
    await sleep(5000)
    await pages.click('button[class="c-button c-button--outline c-button--large c-third_party_auth c-google_login full_width"]')
    console.log('  > Clicked on "Continue With Google" Button')
    await sleep(9000)

    // To remove the Dismiss button 
     dismissButtonClick(pages)
     await sleep(2000)

    //Click the correct google account
    for(let i = 0; i<2; i++){
        await pages.keyboard.press('Tab')
        await sleep(1000)   
    }
    await pages.keyboard.press('Enter')
    console.log('  > Clicked on right "google account"')

    await sleep(4000)

    //Click on the Continue button through Keyboard button "Tab" 
    for (let i = 0; i < 5; i++) {
        await pages.keyboard.press('Tab');
    }
    await pages.keyboard.press('Enter');
    console.log('  > Clicked on "Continue" Button')
    await sleep(8000)
     

    // Click on the workspace title
    for (let i = 0; i < 9; i++) {
        await pages.keyboard.press('Tab');
        await sleep(2000)

    }
    await pages.keyboard.press('Enter');

    await sleep(8000)
    console.log('  > Clicked on workspace title "arbtesting"')
    console.log('Google and Slack Login Completed')

     
})

module.exports =  testarbGmailLogin


