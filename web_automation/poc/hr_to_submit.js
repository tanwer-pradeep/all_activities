//old code from hr_login.js
let pup = require("puppeteer");
let browserlaunch = pup.launch({
    headless:false, 
    args: ['--start-maximized'],
    defaultViewport:null
});
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
    return wtab.type("#input-1", "cojay21313@flmcat.com", {delay : 100});
})
.then(function(){
    return wtab.type("#input-2", "123456789",{delay:100});

}).then(function(){
    let loginpromise =wtab.keyboard.press("Enter");
    let promisearr = Promise.all([loginpromise, wtab.waitForNavigation({waituntill:"networkidle0"})]);
    return promisearr;

})

//----------------------------------------old code from hr_login.js-------------------------------------------------------

//************************************************************* new task ****************************************************************************
// 1st click   #base-card-1-link
//2nd click   #base-card-6-link
// 3rd click  a.js-track-click.challenge-list-item

.then(function(){
    let clickpr = wtab.click("#base-card-1-link");
    let tonext = Promise.all([clickpr, wtab.waitForNavigation({waituntill:"networkidle0"})]);
    return tonext;
})
.then(function(){
    let tosolve = wtab.click("#base-card-6-link");
    let inqus = Promise.all([tosolve, wtab.waitForNavigation({waituntill:"networkidle0"})]);
    return inqus;
}).then(function(){
    return wtab.waitForSelector("a[data-attr1='ctci-making-anagrams']",{visible:true})
})
.then(function(){
    wtab.click("a[data-attr1='ctci-making-anagrams']");
})
// this code gives error as we just waited for click event and not for navigation 
// so we need to apply promise.all , which takes an array of promises so we can pass the above click promise as well as navigation promise in it
//*** navigation promise ---> takes an object {waituntill :<value>} */
