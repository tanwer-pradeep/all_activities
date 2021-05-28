
let req = require("request");
let c = require("cheerio");

let url = "https://www.espncricinfo.com/series/sri-lanka-tour-of-bangladesh-2021-1262340/bangladesh-vs-sri-lanka-3rd-odi-1262347/full-scorecard"

req(url, function(err, res, body){
    if(err) console.log(err);
    else ExtractHtml(body);
})

function ExtractHtml(body){
    let selectorTool = c.load(body);

    // let tables = selectorTool(".table.bowler tbody tr .text-nowrap");
    let tables = selectorTool(".table.bowler tbody td")
    // console.log("Bowlers Name" + "\t\t" + "Wickets");
    for(let i = 0; i < tables.length; i++){
        if(i % 11 == 0) {
            console.log("Bowlers Name :- " + selectorTool(tables[i]).text()+ "\t  Wickets :- " + selectorTool(tables[i + 4]).text());
            console.log();
    
        }
    }
}