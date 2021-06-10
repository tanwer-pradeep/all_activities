//objective :- go to google search for hackerrank and press enter
// this is same as in question 1 with refectoring the code 

let pup = require("puppeteer")

let broweseopen = pup.launch({headless:false, defaultViewport:null})
let gtab;

broweseopen.then(function(broweser){
    let newtab = broweser.newPage();
    // gtab = newtab
    return newtab;
})
.then(function(newtab){
    gtab = newtab;
    let searched = gtab.goto("https://www.google.com");
    return searched;
})
.then(function(){
    let linkedin_typed = gtab.type(".gLFyf.gsfi", "linkedin",{delay:200});
    return linkedin_typed;
})
.then(function(){
    gtab.keyboard.press("Enter");
})

