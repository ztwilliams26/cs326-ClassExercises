let md=require('md5');
let fs = require('fs');

let hashedBeef = "";
for(let i=0; i<=30000; i++){
	hashedBeef+= i +" "+ md(i.toString()) +"\n";
}

fs.writeFileSync("myFile", hashedBeef)