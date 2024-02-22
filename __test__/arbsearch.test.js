
const searchTime = require('../src/arbScript.js');
const captureConsoleLogs = require("../utils/captureLogs");
const convertHtml = require('../utils/convertHtml.js')

// Initialize global log capture once before all tests start
beforeAll(() => {
    global.logCapture = captureConsoleLogs('test_logs');
});

describe('Search Time Measurement', () => {
    it('measures search time for appreviewbot.com with "Slack"', async () => {
        const url = 'https://appreviewbot.com/';
        const searchTerm = 'slack';
        const responseTime = await searchTime(url, searchTerm);

        console.log(`Response time for searching "${searchTerm}" on ${url}: ${responseTime} seconds`);

    }, 90000);

    it('measures search time for next.appreviewbot.com with "Slack"', async () => {
        const url = 'https://next.appreviewbot.com/';
        const searchTerm = 'slack';
        const responseTime = await searchTime(url, searchTerm);

        console.log(`Response time for searching "${searchTerm}" on ${url}: ${responseTime} seconds`);

    }, 90000);
});

//Stop global log capture once after all tests have finished
afterAll(() => {
    global.logCapture.stopCapture();
    convertHtml()
});
