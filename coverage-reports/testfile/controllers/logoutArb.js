//Logout function for AppReviewBot

const Arb_logoutHandler = async (page,sleep) => {
    const profileButton = 'button[class="nav__username"]'
    if(profileButton){
        console.log("> Profile Button is available on the screen")
        await page.click(profileButton)
        await sleep(1000)
        await page.click('button[class="card_button"]')
        console.log("> Button clicked and Logout sccessfully")
    }else{
        console.log("> Profile Button is not available. Trying again to get the element")
        await page.reload()
        console.log("> Page reloaded")
        if(profileButton){
            console.log("> Profile Button is available on the screen")
            await page.click(profileButton)
            await sleep(1000)
            await page.click('button[class="card_button"]')
            console.log("> Second Attempt: Button clicked and Logout sccessfully")
        }else{
            console.log("> Logout not successfull! Please check for the correct selector")
        }

    }
  
}

export default Arb_logoutHandler