let p = require("path");
let f = require("fs");


function view_function(directory, mode){
    if(mode == "tree") treeview(directory, "");
    else if (mode == "flat") flatview(directory);
    else return console.log("No such view exist");
}



function getchild(path){
    return f.readdirSync(path);

}

function isfile(path){
    return f.lstatSync(path).isFile();
}

function treeview(path, indent){

    if(isfile(path) == true){
        console.log(indent, p.basename(path) + "*");
    }else{
        console.log(indent, p.basename(path));
        let folder = getchild(path);
    
        for(let i = 0; i < folder.length; i++){
            treeview(p.join(path, folder[i]), indent + "\t");
        }
    }
}

function flatview(path){
    if(isfile(path) == true){
        console.log(p.join(path + "*"));
    }else{
        console.log(path);
        let folder = getchild(path);
    
        for(let i = 0; i < folder.length; i++){
            flatview(p.join(path, folder[i]));
        }
    }
}

module.exports = {
    view : view_function
}