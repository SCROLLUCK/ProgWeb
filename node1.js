const http = require('http');
const fs = require('fs');

http.createServer(function (req, res){

    res.setHeader('Content-Type','text/html','charset=utf-8');
    show = new Promise (function (resolve, reject){
        fs.readdir(process.argv[2], (error, data) => {
            if( error ) reject (error)
            else resolve (data);
        });
    }).
    then(function (data){
        data.forEach(function (file){
            res.write(file+"</br>")
        });
        res.end();
    }).catch(function (error){
        res.write(error+'');
        res.end();
    })
    
}).listen(3000);