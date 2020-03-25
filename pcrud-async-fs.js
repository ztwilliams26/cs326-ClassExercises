'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
 
let util = require('util');
const newExists = util.promisify(fs.exists);
const newReadFile = util.promisify(fs.readFile);
const newWriteFile = util.promisify(fs.writeFile); 

let counter = {};
const JSONfile = './counter.json';
 
async function reload(filename) {
    if (fs.existsSync(filename)) {
        let counterFromFile = await newReadFile(filename);
        counter = JSON.parse(counterFromFile);
    }
    else {
        counter = {};
    }
}
 
async function createCounter(name, response) {
    counter[name] = 0;
    await newWriteFile(JSONfile, JSON.stringify(counter));
    response.write("<h1> counter " + name + " created </h1>");
    response.end();
}
 
function errorCounter(name, response) {
    response.write("<h1> error: counter " + name + " not found. </h1>");
    response.end();
}
 
function readCounter(name, response) {
    response.write("<h1> counter [" + name + "] = " + counter[name] + " </h1>");
}
 
async function updateCounter(name, response) {
    counter[name] += 1;
    await newWriteFile(JSONfile, JSON.stringify(counter));
    response.write("<h1> counter " + name + " updated </h1>");
}
 
async function deleteCounter(name, response) {
    delete counter[name];
    await newWriteFile(JSONfile, JSON.stringify(counter));
    response.write("<h1> counter " + name + " deleted </h1>");
}
 
const headerText = { "Content-Type": "text/html" };
reload(JSONfile);
let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    response.write(JSON.stringify(options));
    if (request.url.startsWith("/create")) {
        await createCounter(options.name, response);
        return;
    }
    if (!(options.name in counter)) {
        errorCounter(options.name, response);
        return;
    }
    if (request.url.startsWith("/read")) {
        await readCounter(options.name, response);
    }
    else if (request.url.startsWith("/update")) {
        await updateCounter(options.name, response);
    }
    else if (request.url.startsWith("/delete")) {
        await deleteCounter(options.name, response);
    }
    else {
        response.write("no command found.");
    }
    response.end();
});
 
server.listen(8080);
