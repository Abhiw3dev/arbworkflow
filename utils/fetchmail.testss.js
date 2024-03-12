// fetchMailData.test.js

// Import the function to be tested
const fetchMailData = require('./fetchMailContent');

// Mock puppeteer and its functions
jest.mock('puppeteer-extra', () => ({
    use: jest.fn(),
    launch: jest.fn(),
}));

jest.mock('clipboardy', () => ({
    readSync: jest.fn(),
}));

// Mock sleep function
jest.mock('../utils/sleep.js', () => jest.fn());

describe('fetchMailData function', () => {
    test('should return OTP code when found in the mail content', async () => {
        // Mock clipboardy's readSync function to return an OTP code
        const mockOTPCode = '123456';
        require('clipboardy').readSync.mockReturnValueOnce(mockOTPCode);

        // Mock puppeteer's launch function to return a dummy browser instance
        const mockBrowser = {
            newPage: jest.fn().mockResolvedValueOnce({
                setViewport: jest.fn(),
                goto: jest.fn(),
                type: jest.fn(),
                keyboard: {
                    press: jest.fn(),
                    down: jest.fn(),
                    up: jest.fn(),
                },
                waitForSelector: jest.fn(),
                focus: jest.fn(),
                click: jest.fn(),
                screenshot: jest.fn(),
            }),
            close: jest.fn(),
        };
        require('puppeteer-extra').launch.mockResolvedValueOnce(mockBrowser);

        // Call the function and expect it to return the OTP code
         
        const otpCode = await fetchMailData();
        expect(otpCode).toBe(mockOTPCode);

        // Expect puppeteer's launch and close functions to be called
        expect(require('puppeteer-extra').launch).toHaveBeenCalled();
        expect(mockBrowser.close).toHaveBeenCalled();
    });

    // Add more test cases for different scenarios if needed
});
