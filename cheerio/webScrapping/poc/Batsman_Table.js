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
    let highestScorer = "";
    let highestScore = 0;
    for(let i = 0; i < batsman_table.length; i++){
        let tables = selectorTool(batsman_table[i]).find("td");
        for(let j = 0; j < tables.length - 10; j++){
            // let name = "";
            // let score = 0;
            if(j % 9 == 0){ 
                 let name = selectorTool(tables[j]).text();
                 let score = selectorTool(tables[j+2]).text();
                
                console.log("BatsMan Name :-> "+ name + "\t" +"Runs Scored :-> "+ score);
                if(Number(score) >= highestScore) {
                    highestScore = Number(score);
                    highestScorer = name;
                }
            }
        }
        console.log('---------------------------------------------------------------------------------------------')
    }

    console.log("Highest Scorer :-> " + highestScorer + "\t Score :-> " + highestScore);
}