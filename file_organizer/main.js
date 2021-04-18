let input = process.argv.slice(2);
let help = require("./commands/help")
let view = require("./commands/view");


let cmd = input[0];

switch(cmd){
    case "help" :
        help.help();
        break;
    case "view" :
        view.view(input[1], input[2]);
        break;
    case "organize" :
        console.log("organize");
        break;
    default :
        console.log("invalid inputs");
}