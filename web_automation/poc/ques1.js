//objective :- go to google search for hackerrank and press enter

let pup = require("puppeteer")

let broweseopen = pup.launch({headless:false, defaultViewport:null})

broweseopen.then(function(broweser){
    let newtab = broweser.newPage();
    newtab.then(function(newtab){
        let searched = newtab.goto("https://www.google.com");
        searched.then(function(){
            let linkedin_typed = newtab.type(".gLFyf.gsfi", "linkedin",{delay:200});
            linkedin_typed.then(function(){
                newtab.keyboard.press("Enter");
            })
        })
    })
})
