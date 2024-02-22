//Logout function for nextAppReviewBot

const Next_logoutHandler = async (page,sleep) => {

    await page.click('div[class="dropdown dropdown-end"]')
    await sleep(1000)
 
    const xpath = '//*[@id="__next"]/nav/div/div[2]/div/ul/li[3]/a'
    const [clickLogout] = await page.$x(xpath)
    await sleep(2000)
    if(clickLogout){
        await clickLogout.click();
        console.log("> Logout successfull")
    }else{
        console.log("> Error: Logout not successful")
    }   
}
 
export default Next_logoutHandler