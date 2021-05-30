let req = require("request");
let c = require("cheerio");


let url = "https://www.espncricinfo.com/series/sri-lanka-tour-of-bangladesh-2021-1262340/bangladesh-vs-sri-lanka-3rd-odi-1262347/full-scorecard"

req(url, function(err, res, html){
    if(err) console.log(err);
    else ExtractHtml(html);
});

function ExtractHtml(html){
    let selectorTool = c.load(html);
    let teams = selectorTool(".table.batsman");
    let teamname = selectorTool(".Collapsible .header-title.label")
    
    for(let i = 0; i < teams.length; i++){
        let batsman = (selectorTool(teams[i]).find(".batsman-cell a"));
        for(let j = 0; j < batsman.length; j++) {
            console.log("Player Name :-->  "+selectorTool(batsman[j]).text()+"\t Team :-->" + (selectorTool(teamname[i]).text().split("INNINGS")[0]));
        }
        console.log('----------------------------------------------------------------------')
    }
}


