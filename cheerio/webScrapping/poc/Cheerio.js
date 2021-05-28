// require the install package
let req = require("request");
let cheerio = require("cheerio");

// request (url, callback)
console.log("before");
req("https://www.pepcoding.com/", function(err, res, body){
    if(err) console.log(err);
    else ExtractHtml(body);
})

console.log("after");


// now function of cheerio is to load body from request and 
// parse it as an html so that we can use it to extract the info 
// of our intrest (so we made a function and passing our body in in)

function ExtractHtml(body){
    // cheerio gives a selector tool on loading the html

    let selector = cheerio.load(body);

    // now this selector will help us to select the elements 
    // same as we do in css 

    // let selectedElement = selector("#id/.class")
    // selectedElement so obtained will be in the form of object
    // so to print the required content we have to select its text only
    // by "selectedElement.text()" function
    // console.log("printing from inside");   
    let element = selector(".col.l3.s12.m3");
   // console.log(element); // an object
    console.log(element.text()); // gives the text inside element
    console.log(element.html());
}

