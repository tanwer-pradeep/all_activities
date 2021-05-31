

let req = require("request");
let c = require("cheerio");


let url = "https://github.com/topics";
req(url, function(err, res, html){
    if(err) console.log(err);
    else extractTopics(html);
});

function extractTopics(html){
    let selectorTool = c.load(html);
    let topicname = selectorTool("li.col-12.col-sm-6.col-md-4.mb-4 a");

    for(let  i = 0; i < topicname.length;i++){
        let name = selectorTool(topicname[i]).attr("href");
        let newlink = ("https://github.com" + name);
        extractRepo(newlink);
    }

}

function extractRepo(url){
    req(url, function(err, res, html){
        if(err) console.log(err);
        else{
            getissues(html);
        }
    });

}

function getissues(html){
    let selectorTool = c.load(html);
    let topicname = selectorTool(".h1");
    let issueList = selectorTool(".col-md-8.col-lg-9 .my-4");

    console.log(topicname.text());
    for(let i = 0; i < 8; i++){
        let issueLink = selectorTool(issueList[i]).find(".tabnav-tabs a")
        for(let j = 0; j < issueLink.length; j++)
        if(j % 3 == 1){
            let ilink = 'https://github.com'+selectorTool(issueLink[1]).attr("href");
             console.log(ilink);
             getdetails(ilink);
        }
    }
    console.log('------------------------------------------------------------------------------------------------------'); 
}

function getdetails(url){
    // console.log(url)
    req(url, function(err, resp, html){
        if(err) console.log(err);
        else getidetails(html)
    });

    function getidetails(html){
        let tool = c.load(html);
        let content = tool(".flex-auto.min-width-0.p-2.pr-3.pr-md-2 .markdown-title");
        let link = "https://github.com" + content.attr("href");
        console.log("link :---->" + link);
        
        // for(let i = 0; i < content.length; i++){
            let text = tool(content[0]).text();
            console.log("text :----> " + text);
        // }
    }
}
