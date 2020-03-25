'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
 
let counter = {};
 
function createCounter(name, response) {
    counter[name] = 0;
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
 
function updateCounter(name, response) {
    counter[name] += 1;
    response.write("<h1> counter " + name + " updated </h1>");
}
 
function deleteCounter(name, response) {
    delete counter[name];
    response.write("<h1> counter " + name + " deleted </h1>");
}
 
const headerText = { "Content-Type": "text/html" };
let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    response.write(JSON.stringify(options));
    if (request.url.startsWith("/create")) {
        createCounter(options.name, response);
        return;
    }
    if (!(options.name in counter)) {
        errorCounter(options.name, response);
        return;
    }
    if (request.url.startsWith("/read")) {
        readCounter(options.name, response);
    }
    else if (request.url.startsWith("/update")) {
        updateCounter(options.name, response);
    }
    else if (request.url.startsWith("/delete")) {
        deleteCounter(options.name, response);
    }
    else {
        response.write("no command found.");
    }
    response.end();
});
server.listen(8080);
