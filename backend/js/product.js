const http = require('http');

console.log('dfdfdfdf');

function buttonClick(){
    http.get('http://localhost:4000/getall', function(res){
        console.log(res);

    });
}

function imaging(){
    console.log('tesst');
}

var x = 'testing';

module.exports = imaging;