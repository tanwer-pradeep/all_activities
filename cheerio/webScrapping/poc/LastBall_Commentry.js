let req = require("request");
let c = require("cheerio");

let url = "https://www.espncricinfo.com/series/sri-lanka-tour-of-bangladesh-2021-1262340/bangladesh-vs-sri-lanka-3rd-odi-1262347/ball-by-ball-commentary"
req(url, function(err,res,body){
    if(err) console.log(err);
    else ExtractHtml(body);
})

function ExtractHtml(body){
    let selectorTool = c.load(body);

    let lastballcommentry = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-wrapper .match-comment-long-text");
    
    // console.log(lastballcommentry.html());
    // if we are using array and gives any index then .text() function dont
    // work as expected so we have to wrap it again inside the selector tool
    console.log(selectorTool(lastballcommentry[0]).text());


}
