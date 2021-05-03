let fs = require("fs");
let p = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
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

function getchild(path){
    return fs.readdirSync(path);

}
function file_to_organise(dir, organisedpath){
    if(isfile(dir) == true){
        let extn = dir.split(".");
        let file_extension = extn[extn.length - 1];
        for(let i in types){
            for(let j = 0; j < types[i].length; j++){
                if(file_extension == types[i][j]){
                    let fp = p.join(organisedpath, i);
                    let orignalname = p.basename(dir)
                    fs.copyFileSync(dir, p.join(fp,orignalname));
                }
            }
        }
    }else{
        let f = getchild(dir);
        for(let i = 0; i < f.length; i++){
            file_to_organise(p.join(dir, f[i]),organisedpath);
        }
    }
}


function organize(path){
    let organizedfolder = p.join(path, "organized");
    dircreator(organizedfolder);
   
    for(let i in types){
        let folder = p.join(organizedfolder, i);
        dircreator(folder);
    }

    file_to_organise(path, organizedfolder);
}


module.exports = {
    organize : organize
}