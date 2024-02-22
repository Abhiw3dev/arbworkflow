//Login function for AppReviewBot

const Arb_logintHandler = async (page, sleep) => {
    const loginButton= 'a[class="nav__button nav__button--link"]'
    await page.click(loginButton)
    console.log('> Login button clicked')
    
    //login credentials
    await page.type('input[type="email"]', 'testing00@gmail.com')
    await page.type('input[type="password"]', 'testing00')
    await sleep(2000)
    console.log("> login credentials entered")

    //submit button
    await page.click('input[type="submit"]')

    await sleep(4000)
    const newUrl = page.url();
    console.log("> Capturing the URL of the navigated page after the login")

  // Verify if the navigation was successful
    if (newUrl === 'https://appreviewbot.com/') {
        console.log('> Navigated to the correct page.');
        await sleep(2000)
        console.log('> Login sucessfull')
    } 
    else {
        console.log('> Button click did NOT navigate to the expected page.');
        await sleep(1000)
        await page.goto('https://appreviewbot.com/login')

        console.log('> Attempting the login for the second time')

        await page.type('input[type="email"]', 'testing00@gmail.com')
        await page.type('input[type="password"]', 'testing00')
        await sleep(2000)
        await page.click('input[type="submit"]')

        await sleep(4000)
        
        // Verify if the navigation was successful
        if(newUrl ==='https://appreviewbot.com/'){
            console.log('> Navigated to the correct page.');
            await sleep(2000)
            console.log('> Second attempt: Login sucessfull')
        }else{
            console.log('> Second attempt: Login failed')
        }
    }

}

export default Arb_logintHandler