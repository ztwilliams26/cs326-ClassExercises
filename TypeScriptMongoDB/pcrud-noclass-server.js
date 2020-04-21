'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
let util = require('util');
let level = require('level');

const dbFile = 'counter-db';
const db = level(dbFile);

async function isFound(name) {
    try {
	let v = await db.get(name);
	console.log(v);
	return true;
    } catch (err) {
	return false;
    }
}

async function createCounter(name, response) {
    await db.put(name, 0);
    response.write(JSON.stringify({'result' : 'created',
				   'name' : name,
				   'value' : 0 }));
    response.end();
}

function errorCounter(name, response) {
    response.write(JSON.stringify({'result': 'error'}));
    response.end();
}

async function readCounter(name, response) {
    let value = await db.get(name);
    response.write(JSON.stringify({'result' : 'read',
				   'name' : name,
				   'value' : value }));
}

async function updateCounter(name, value, response) {
    await db.put(name, value);
    response.write(JSON.stringify({'result' : 'updated',
				   'name' : name,
				   'value' : value }));
}

async function deleteCounter(name, response) {
    await db.del(name);
    response.write(JSON.stringify({'result' : 'deleted',
				   'value'  : name }));
}

const headerText = { "Content-Type": "application/json",
		     "Access-Control-Allow-Origin": "*",
		     "Access-Control-Allow-Headers": "*"
		   };

let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    if (request.url.startsWith("/create")) {
	await createCounter(options.name, response);
        return;
    }
    let found = await isFound(options.name);
    if (!found) {
	errorCounter(options.name, response);
        return;
    }
    if (request.url.startsWith("/read")) {
	await readCounter(options.name, response);
    }
    else if (request.url.startsWith("/update")) {
	await updateCounter(options.name, options.value, response);
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
