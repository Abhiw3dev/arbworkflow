// jest.setup.js
global.consoleLogs = {};

const originalLog = console.log;
console.log = (...args) => {
  const testName = expect.getState().currentTestName;
  if (testName) {
    if (!global.consoleLogs[testName]) {
      global.consoleLogs[testName] = [];
    }
    global.consoleLogs[testName].push(args.map(String).join(' '));
  }
  originalLog(...args);
};
