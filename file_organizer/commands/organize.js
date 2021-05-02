let fs = require("fs");
let p = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex','js'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


function dircreator(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function isfile(dir){
    return fs.lstatSync(dir).isFile();
}

function organize(path){
    // let organizedfolder = p.join(path, "organized");
    // dircreator(organizedfolder);
   
    // for(let i in types){
    //     let folder = p.join(organizedfolder, i);
    //     dircreator(folder);
    // }
    if(isfile(path) == true){
        let extn = path.split(".");
        let file_extension = extn[extn.length - 1];
        for(let i in types){
            // console.log(types[i]);
            if(file_extension in types[i]) console.log(i);
        }
    }else{
        console.log("false");
    }


    // console.log(path);
    // console.log("organize implemented");
}


module.exports = {
    organize : organize
}