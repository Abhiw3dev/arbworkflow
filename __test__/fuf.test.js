
const puppeteer = require('puppeteer')
const sleep = require('../utils/sleep.js');
const fs = require('fs')
 
describe('First User Flow Test', () => {

    beforeAll(async () => {
        console.log('Starting the Jest test for the arb first user flow');
    });

    test('Integration Test', async () => {
        
    const browser = await puppeteer.launch({ headless:"new", args: ['--start-maximized'], defaultViewport: null });
    
    const cookiesSlackPath = './signInCookies/slackCookies.json'

    if (fs.existsSync(cookiesSlackPath)) {
        const slackpage = await browser.newPage();
        const cookies = JSON.parse(fs.readFileSync(cookiesSlackPath, 'utf-8'));
        for (let cookie of cookies) {
            await slackpage.setCookie(cookie);
        }
        console.log('Cookies loaded successfully for Slack.');
    } else {
        console.log('No cookies file found for Slack.');
        await browser.close()
    }

    await sleep(2000)
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    console.log("Begin to test the appreviewbot.com");

    await page.goto('https://appreviewbot.com/', { waitUntil: 'load' });

    console.log("> Reached target site");

    await sleep(5000);

    const loginButton = 'a[class="nav__button nav__button--link"]'
    await page.click(loginButton)
    console.log('> Login button clicked')

    //login credentials
    await page.type('input[type="email"]', 'testing00@gmail.com', { delay: 150 })
    await sleep(1000)
    await page.type('input[type="password"]', 'testing00', { delay: 150 })
    await sleep(1000)
    console.log("> login credentials entered")

    //submit button
    const click1 = 'input[type="submit"]'
    const click2 = 'input[name="submit"]'
    const click3 = 'input[value="Continue"]'
    if(click1){
    await page.click(click1)
    console.log('clicked 1st time')
    await sleep(3000)
    }else if(click2){
    await page.click(click2)
    console.log('clicked 2nd time')
    await sleep(3000)
    }else if(click3){
    await page.click(click3)
    console.log('clicked 3rd time')
    }else{
        console.log('submit button not working or clickable')
    }
    await sleep(40000)
    const newUrl = page.url();
    console.log("> Capturing the URL of the navigated page after the login")
    console.log('> Captured URL: ',newUrl)

    // Verify if the navigation was successful
    if (newUrl===('https://appreviewbot.com/')) {
        console.log('> Navigated to the correct page.');
        await sleep(1000)
        console.log('> Login sucessfull')
    }
    else {
        console.log('> Button click did NOT navigate to the expected page.');
        await sleep(1000)
        await page.goto('https://appreviewbot.com/login')

        console.log('> Attempting the login for the second time')

        await page.type('input[type="email"]', 'testing00@gmail.com', { delay: 150 })
        await sleep(1000)
        await page.type('input[type="password"]', 'testing00', { delay: 150 })
        await sleep(1000)
        await page.click('input[type="submit"]')

        await sleep(40000)

        // Verify if the navigation was successful
        if (newUrl ===('https://appreviewbot.com/')) {
            console.log('> Navigated to the correct page.');
            await sleep(2000)
            console.log('> Second attempt: Login sucessfull')
        } else {
            console.log('> Second attempt: Login failed')

            await browser.close()
        }
    }

    await sleep(30000)
    await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
    await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
    console.log('> An application is searched ')
    await sleep(5000)

    await page.waitForSelector('div.search__results', { visible: true })
    await sleep(1000)
    console.log('search result selector found')

    await page.waitForSelector('div.search__results > div.search__result-container')

    console.log('selector container found')
    await sleep(1000)
    await page.click('div.search__results > div.search__result-container:nth-child(1)')
    console.log('one search result clicked')

    await sleep(2000)

    await page.click('img[src="https://platform.slack-edge.com/img/add_to_slack.png"]')
    console.log('> Clicked on "Add to Slack" ')
    await sleep(20000)

    await page.type('input[class="c-input_text c-select_input"]', 'arb')
    await sleep(2000)
    console.log(' > Selected a channel for integration')

    await page.keyboard.press('Enter')
    await sleep(1000)
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    console.log(' > Clicked on "Allow" button')

    await sleep(20000)
    console.log(' > Waiting for few seconds until Alerts to appear')

    // Extracting inner text from elements matching the selector
    const innerText = await page.evaluate(() => {
        const elements = document.querySelectorAll('div[class="oauth-container"]');
        let combinedText = '';
        elements.forEach(element => {
            const sanitizedText = element.innerText.replace(/[+\n]/g, '');
            combinedText += sanitizedText + '  ';

        });
        return combinedText.trim(); // Remove trailing and leading whitespace
    });
    console.log(' ')
    console.log('sanitizedStatement: \n', innerText)

    await sleep(5000)

    const statement1ToCheck = "You're all set!Your app reviews will start appearing in your Slack channel momentarily!Want to monitor reviews for another app? Add it now!"
    const statement2ToCheck = "Limit of Existing Plan Reached!You are trying to track reviews for more applications than your subscription provides.Want to monitor reviews for another app? Add it now!"
    console.log(' ')
    console.log('Statement To Match:\n', 'Statement 1:\n ', statement1ToCheck, '\n\n', 'Statement 2:\n ', statement2ToCheck)
    console.log(' ')

    let isPresent = innerText.includes(statement1ToCheck || statement2ToCheck);
    if (isPresent = innerText.includes(statement1ToCheck)) {
        console.log('Matched statement: ', statement1ToCheck);
        console.log(' ')
        console.log('Integration successfull')
    } else if (isPresent = innerText.includes(statement2ToCheck)) {
        console.log(' ')
        console.log('Matdched statement: ', statement2ToCheck)
        console.log(' ')
        console.log('Integration not successfull')
    } else {
        console.log('something went wrong or text is not fetched properly')
    }

    await sleep(5000)
    await browser.close()
    
},200000);
});

