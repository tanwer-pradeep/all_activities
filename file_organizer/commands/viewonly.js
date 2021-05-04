let fs = require("fs");
let path = require("path");

function viewonly(dirpath, ext){
    if(fs.lstatSync(dirpath).isFile() == true){
        let file_extension = path.extname(dirpath);
        if(file_extension == ext){
            console.log(dirpath);
        }
    }else{
        let content = fs.readdirSync(dirpath);
        for(let i = 0; i < content.length; i++){
            viewonly(path.join(dirpath, content[i]), ext);
        }
    }
}


module.exports = {
    viewonly : viewonly
}






