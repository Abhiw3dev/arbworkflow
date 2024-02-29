// const dismissButtonClick = require("./dismissButton");

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
    await sleep(8000)

    console.log('  > SignIn to gmail account success ')
    
 
})

module.exports =  testarbGmailLogin


