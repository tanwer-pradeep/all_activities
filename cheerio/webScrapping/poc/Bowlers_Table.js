
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
    let hw = 0;
    let hwt = "";
    for(let i = 0; i < tables.length; i++){
        if(i % 11 == 0) {
            console.log("Bowlers Name :- " + selectorTool(tables[i]).text()+ "\t  Wickets :- " + selectorTool(tables[i + 4]).text());
            console.log();
            if(hw <= selectorTool(tables[i + 4]).text()){
                hwt = selectorTool(tables[i]).text()
                hw = selectorTool(tables[i + 4]).text();
            }
        }
    }
    console.log(hwt + "\t" + hw);
}

// function ExtractHtml(body){
//     let selectorTool = c.load(body);

//     let tables = selectorTool(".table.bowler");
//     let hwt = "";
//     let hw = 0;
//     for(let i = 0; i < tables.length; i++){
//         //find function search for the passed attribute only in
//         // the given/selected element
//         let bolwers = (selectorTool(tables[i]).find("td"));
//         // for(let j = 0; j < bolwers.length; j++) {
//         //     // console.log(selectorTool(bolwers[j]).text());
//         //     if(j % 11 == 0) console.log("Bowler Name :-> " + selectorTool(bolwers[j]).text() + "  wickets taken :-> " + selectorTool(bolwers[j + 4]).text());
//         //     if(hw <= selectorTool(bolwers[j + 4]).text()){
//         //         hwt = selectorTool(bolwers[j]).text()
//         //         hw = selectorTool(bolwers[j + 4]).text();
//         //     }
//         // }

    
//         console.log('------------------------------------------------------');
//     }

//     console.log("highest wicket taker :-> " + hwt + "\t highest wickets :-> " + hw);
// }