const fs = require('fs');
const path = require('path');

function convertHtml(){
// Specify the path to the input file and the output HTML file
const inputFile = path.join(__dirname, '../consoleLogs/test_logs.log');
const outputFile = path.join(__dirname,'../consoleLogs/test_consoleLog.html');

// Read the content from the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        return;
    }

    // Create the HTML content
    const htmlContent = 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Test Report</title>
  <style type="text/css">
    html,
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
      margin: 0;
      padding: 0;
      color: #333;
    }

    body {
      padding: 2rem 1rem;
      font-size: 0.85rem;
    }

    .jesthtml-content {
      margin: 0 auto;
      max-width: 70rem;
    }

    header {
      display: flex;
      align-items: center;
    }

    #title {
      margin: 0;
      flex-grow: 1;
    }
 
 
    .test-result {
      padding: 1rem;
      margin-bottom: 0.25rem;
    }

    .test-result:last-child {
      border: 0;
    }

    .test-result.passed {
      background-color: #dff2bf;
      color: #4f8a10;
      font-weight: 550;
    }

    .suite-container>input[type="checkbox"] {
      position: absolute;
      left: -100vw;
    }
 
    .suite-info {
      padding: 1rem;
      background-color: #eee;
      color: #777;
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
    }

    .suite-info:hover {
      background-color: #ddd;
      cursor: pointer;
    }

    .suite-info .suite-path {
      word-break: break-all;
      flex-grow: 1;
      font-family: monospace;
      font-size: 1rem;
    }
  </style>
</head>

<body>
  <div class="console-content">
    <header>
      <h1 id="title">Test Report- Console messages</h1>
    </header>
    <div id="metadata-container">
    </div>
    <div id="suite-1" class="suite-container"><input id="collapsible-0" type="checkbox" class="toggle"
        checked="checked" /><label for="collapsible-0">
        <div class="suite-info">
          <div class="suite-path">C:\Users\w3dev\Desktop \puppeteer-githubActions\__test__\arbsearch.test.js</div>
        </div>
      </label>
      <div class="suite-tests">
        <div class="test-result passed">
          <div class="test-info">
            <pre>${escapeHtml(data)}</pre>
            </div> 
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Write the HTML content to the output file
    fs.writeFile(outputFile, htmlContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the HTML file:', err);
            return;
        }
        // console.log('HTML file has been created:', outputFile);
    });
});

// Function to escape HTML special characters in the input data
function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
}
}

module.exports = convertHtml