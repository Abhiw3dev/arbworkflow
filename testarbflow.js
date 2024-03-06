
// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import sleep from './utils/sleep.js';
// import dotenv from 'dotenv';
// import clipboardy from 'clipboardy';
// import fetchMailData from './utils/fetchMailContent.js';
// import fs from 'fs';



const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const sleep = require('./utils/sleep.js');
// const dotenv = require('dotenv');
const clipboardy = require('clipboardy');
const fetchMailData = require('./utils/fetchMailContent.js');
const fs = require('fs');

const firstUserFlow = async () => {
    try {
         
        

        const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'], defaultViewport: null });

        console.log('login the gmail account');

        const pages = await browser.newPage();
        await pages.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

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

        await sleep(10000)
        const page = await browser.newPage();

        console.log("Begin to test the next.appreviewbot.com");

        await page.goto('https://next.appreviewbot.com/login/', { waitUntil: 'load' });

        console.log("> Reached target site");

        await sleep(90000)
        console.log('> Initiating the Login Process ')

        clipboardy.writeSync(' ');

        await page.type('input[class="w-full py-3 px-4 text-md text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg bg-white null"]', 'arbtest@mailsac.com');
        await page.keyboard.press('Enter');
        await sleep(10000);

        fetchMailData()

        const otpCode = await fetchMailData();
        console.log('OTP Code:', otpCode);

        await sleep(30000)

        await page.type('input[class="w-full py-3 px-4 text-lg text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg  bg-white"]', otpCode);

        await page.screenshot({ path: './otp-screenshot.png', fullPage: true });
        await sleep(1000)
        console.log(' > OTP pasted')
        await sleep(1000)
        await page.screenshot({ path: './otp overview-screenshot.png', fullPage: true });

        await page.click('span[class="relative"]')

        await sleep(30000)

        const url = page.url()
        console.log(url)
        await page.screenshot({ path: './after otp-screenshot.png', fullPage: true });

        await page.click('input[placeholder="Type your app name to get started"]', { delay: 500 });
        await page.type('input[placeholder="Type your app name to get started"]', 'facebook');
        console.log('> An application is searched ')

        await page.waitForSelector('div[class="absolute resultdropdown overflow-y-auto h-80 w-full top-16 bg-white border-[0.9px] border-solid border-[0.9px] border-opacity-[0.4] rounded-[4px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] z-50"]');

        await page.click('span[class="flex items-center w-11/12 cursor-pointer"]')
        console.log('> Selected a result from the search result ')
        await sleep(5000)

        await page.click('img[src="https://ikc.edgekit.net/zhrqfuolmb/add_to_slack.png?updatedAt=1685700931979"]')
        console.log('> Clicked on "Add to Slack" ')
        await sleep(10000)

        await page.type('input[class="c-input_text c-select_input"]', 'arb')
        await sleep(2000)
        console.log(' > Selected a channel for integration')

        await page.keyboard.press('Enter')

        await sleep(2000)
        const allowButton = 'button[class="c-button c-button--primary c-button--medium"]'
        await page.waitForSelector(allowButton, { visible: true })

        for (let i = 0; i < 5; i++) {
            await pages.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter')
        console.log(' > Clicked on "Allow" button')

        await sleep(25000)
        console.log(' > Waiting for few seconds until Alerts to appear')

        const innerText = await page.evaluate(() => {
            const targetElement = document.querySelector('div[class="container py-10"]');
            return targetElement ? targetElement.innerText.trim() : null;
        });

        const message_1 = "You are trying to track reviews for more applications than your subscription provides. Please Upgrade your plan";
        const message_2 = "Your app reviews will start appearing in your Slack channel momentarily! Want to monitor reviews for another app? Add it now!";

        const normalizedInnerText = innerText.replace(/\s+/g, ' ').trim();
        const normalizedMessage_1 = message_1.replace(/\s+/g, ' ').trim();
        const normalizedMessage_2 = message_2.replace(/\s+/g, ' ').trim();

        console.log('> Fetched Alert Text:', `"${normalizedInnerText}"`);
        console.log(' ');

        if (normalizedInnerText.includes(normalizedMessage_1)) {
            console.log("  > Integration not successful, it requires upgrading the plan");
            console.log(' ');
        } else if (normalizedInnerText.includes(normalizedMessage_2)) {
            console.log('  > Integration successful');
            console.log(' ');
        } else {
            console.log('  > Unexpected message:', normalizedInnerText);
            console.log(' ');
        }

        await sleep(5000)
        await browser.close()

    } catch (error) {
        console.error('Error in firstUserFlow:', error);
    }
};

// firstUserFlow();
module.exports = firstUserFlow

