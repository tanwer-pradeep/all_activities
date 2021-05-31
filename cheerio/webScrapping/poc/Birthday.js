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
    let teamname = selectorTool(".Collapsible .header-title.label");
    let partLink = "https://www.espncricinfo.com";
 
    for(let i = 0; i < batsman_table.length; i++){
        let tables = selectorTool(batsman_table[i]).find("td");
        for(let j = 0; j < tables.length - 10; j++){
           
            if(j % 9 == 0){ 
                 let name = selectorTool(tables[j]).text();
                 let score = selectorTool(tables[j+2]).text();
                 let playersteam = (selectorTool(teamname[i]).text().split("INNINGS")[0])
                 let linkselector =(selectorTool(tables[j])).find("a");
                 let link = partLink + linkselector.attr("href");

                 printall(link, name, score, playersteam);
                
                // console.log("BatsMan Name :-> "+ name + "\t" +"Runs Scored :-> "+ score +"\t Team :-->" + playersteam);
                // console.log(link);
            }
        }
        
    }
}

function printall(link, name, score, playersteam){
    req(link, function(err,res, html){
        if(err) console.log(err);
        else Extractbirthday(html);
    });

    function Extractbirthday(html){
        let selectorTool = c.load(html);
        let birthday = selectorTool(".player-card-description");
        // console.log();
        let dob = selectorTool(birthday[1]).text()
        console.log("BatsMan Name :-> "+ name + "\t" +"DOB :-> " + dob +"\t" +"Runs Scored :-> "+ Number(score) +"\t Team :-->" + playersteam);
        console.log("\n");
    }
}