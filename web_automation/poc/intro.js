let pup = require("puppeteer");

let browseropen = pup.launch({headless:false})
browseropen.then(function(browser){
    let tab1 = browser.newPage()
    tab1.then(function(tab1){
        tab1.goto("https://www.linkedin.com");
    })
    
})
