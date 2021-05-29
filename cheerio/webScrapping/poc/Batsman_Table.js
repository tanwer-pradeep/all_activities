let req = require("request");
let c = require("cheerio");

let url = "https://www.espncricinfo.com/series/sri-lanka-tour-of-bangladesh-2021-1262340/bangladesh-vs-sri-lanka-3rd-odi-1262347/full-scorecard"

req(url, function(err, res, body){
    if(err) console.log(err);
    else ExtractHtml(body);
})

function ExtractHtml(body){
    let selectorTool = c.load(body);
    let batsman_table = selectorTool(".table.batsman");
    for(let i = 0; i < batsman_table.length; i++){
        let tables = selectorTool(batsman_table[i]).find("td");
        for(let j = 0; j < tables.length - 10; j++){

            if(j % 9 == 0) console.log(selectorTool(tables[j]).text() + "\t" + selectorTool(tables[j+2]).text());
           
        }
        console.log('---------------------------------------------------------------------------------------------')
    }
}