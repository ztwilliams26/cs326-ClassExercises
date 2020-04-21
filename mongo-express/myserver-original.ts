let http = require('http');
let url = require('url');

export class MyServer {

    private theDatabase;
    private server;

    private headerText = { "Content-Type": "application/json",
			   "Access-Control-Allow-Origin": "*",
			   "Access-Control-Allow-Headers": "*"
			 };
    
    constructor(db) {
	this.theDatabase = db;
	this.server = http.createServer();
	this.server.on('request', this.handler.bind(this));
    }

    public async handler(request, response) : Promise<void> {
	response.writeHead(200, this.headerText);
	let options = url.parse(request.url, true).query;
	if (request.url.startsWith("/create")) {
	    await this.createCounter(options.name, response);
	    return;
	}
	let found = await this.theDatabase.isFound(options.name);
	console.log("found value = " + found);
	if (!found) {
	    this.errorCounter(options.name, response);
            return;
	}
	if (request.url.startsWith("/read")) {
	    await this.readCounter(options.name, response);
	}
	else if (request.url.startsWith("/update")) {
	    await this.updateCounter(options.name, options.value, response);
	}
	else if (request.url.startsWith("/delete")) {
	    await this.deleteCounter(options.name, response);
	}
	else {
            response.send("no command found.");
	}
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async createCounter(name: string, response) : Promise<void> {
	console.log("creating counter named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }

    public async updateCounter(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
    }
}

