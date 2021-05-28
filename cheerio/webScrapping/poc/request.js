// require the install package
let req = require("request");

// request (url, callback)
console.log("before");
req("https://www.pepcoding.com/", function(err, res, body){
    if(err) console.log(err);
    else console.log(body);
})

console.log("after");