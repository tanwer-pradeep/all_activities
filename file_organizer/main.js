let input = process.argv.slice(2);
let help = require("./commands/help")
let view = require("./commands/view");
let organize = require("./commands/organize");
let viewonly = require("./commands/viewonly");


let cmd = input[0];

switch(cmd){
    case "help" :
        help.help();
        break;
    case "view" :
        view.view(input[1], input[2]);
        break;
    case "organize" :
        organize.organize(input[1]);
        break;
    case "viewonly" :
        viewonly.viewonly(input[1], input[2]);
        break;
    default :
        console.log("invalid inputs");
}