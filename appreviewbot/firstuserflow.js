//Check the Llogin and logout function in appreviewbot.com

const  puppeteer = require('puppeteer')
const sleep = require('../utils/sleep');
const fs = require('fs')

const firstflow = (async () => {

    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });
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

    console.log("Begin to test the appreviewbot.com");

    await page.goto('https://appreviewbot.com/',{waitUntil:'load'});

    console.log("> Reached target site");

    await sleep(2000);

    const loginButton= 'a[class="nav__button nav__button--link"]'
    await page.click(loginButton)
    console.log('> Login button clicked')
    
    //login credentials
    await page.type('input[type="email"]', 'testing00@gmail.com',{delay:150})
    await sleep(1000)
    await page.type('input[type="password"]', 'testing00',{delay:150})
    await sleep(1000)
    console.log("> login credentials entered")

    //submit button
    await page.click('input[type="submit"]')

    await sleep(5000)
    const newUrl = page.url();
    console.log("> Capturing the URL of the navigated page after the login")

  // Verify if the navigation was successful
    if (newUrl === 'https://appreviewbot.com/') {
        console.log('> Navigated to the correct page.');
        await sleep(1000)
        console.log('> Login sucessfull')
    } 
    else {
        console.log('> Button click did NOT navigate to the expected page.');
        await sleep(1000)
        await page.goto('https://appreviewbot.com/login')

        console.log('> Attempting the login for the second time')

        await page.type('input[type="email"]', 'testing00@gmail.com',{delay:150})
        await sleep(1000)
        await page.type('input[type="password"]', 'testing00',{delay:150})
        await sleep(1000)
        await page.click('input[type="submit"]')

        await sleep(5000)
        
        // Verify if the navigation was successful
        if(newUrl ==='https://appreviewbot.com/'){
            console.log('> Navigated to the correct page.');
            await sleep(2000)
            console.log('> Second attempt: Login sucessfull')
        }else{
            console.log('> Second attempt: Login failed')
        }
    }

    


    
    await sleep(2000)
    await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
    await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
    console.log('> An application is searched ')
    await sleep(5000)

    await page.waitForSelector('div.search__results',{visible:true})
    await sleep(1000)
    console.log('search result selector found')

//     // Get the inner HTML of the search results container
//     const innerHTML = await page.evaluate(() => {
//     const searchResultsContainer = document.querySelector('div.search__results');
//     return searchResultsContainer.innerHTML;
//   });

//   console.log('Inner HTML of search results:', innerHTML);


await page.waitForSelector('div.search__results > div.search__result-container')

 
    console.log('selector container found')
    await sleep(1000)
    await page.click('div.search__results > div.search__result-container:nth-child(1)')
    console.log('one search result clicked')

 
      
    await sleep(2000)

    await page.click('img[src="https://platform.slack-edge.com/img/add_to_slack.png"]')
    console.log('> Clicked on "Add to Slack" ')
    await sleep(8000)

    await page.type('input[class="c-input_text c-select_input"]', 'arb')
    await sleep(2000)
    console.log(' > Selected a channel for integration')

    await page.keyboard.press('Enter')
    await sleep(1000)
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    console.log(' > Clicked on "Allow" button')

    await sleep(40000)
    console.log(' > Waiting for few seconds until Alerts to appear')

    const innerText = await page.evaluate(() => {
        const targetElement = document.querySelector('div[class="alert__message"]');
        return targetElement ? targetElement.innerText.trim() : null;
    });

    const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan";
    const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";

    const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
    const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
    const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

    console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);
    console.log(' ');

    if (innerText === "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan") {
        console.log("  > Integration not successful, it requires upgrading the plan");
        console.log(' ');
    } else if (innerText === "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!") {
        console.log('  > Integration successful');
        console.log(' ');
    } else {
        console.log('  > Unexpected message:',  innerText);
        console.log(' ');
    }

    await sleep(5000)
    await browser.close()
    
 
});
firstflow()