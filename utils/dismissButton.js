
const dismissButtonClick = async(pages)=>{
    // To remove the Dismiss button 
    const dismissButton1 = 'button[class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 xYnMae TrZEUc lw1w4b"]'
    const dismissButton2 = 'span[class="VfPpkd-RLmnJb"]'
    // await pages.waitForSelector(dismissButton, {visible:true})
    if(dismissButton1){
        await pages.click(dismissButton1)
        console.log('  > Dismiss Button 2 Clicked')
    }else if(dismissButton2){
        await pages.click(dismissButton2)
        console.log('  > Dismiss Button 2 Clicked')
    }else{
        console.log('dismiss button not found')
    }
}
module.exports= dismissButtonClick