
let pup = require("puppeteer");
let browserlaunch = pup.launch({headless:false, defaultViewport:null});
let wtab;


browserlaunch.then(function(browser){
    let newtab = browser.pages();
    return newtab;
})
.then(function(newtab){
    wtab = newtab[0];
    return wtab.goto("https://www.hackerrank.com/auth/login");
})
.then(function(){
    return wtab.type("#input-1", "cojay21313@flmcat.com", {delay : 300});
})
.then(function(){
    return wtab.type("#input-2", "123456789",{delay:300});

}).then(function(){
    wtab.keyboard.press("Enter");
})