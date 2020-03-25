let http = require('http');
let url = require('url');
const headerText = {"Content-Type" : "text/html"};
let server = http.createServer(((request,response) =>
                               {
                                   response.writeHead(200, headerText);
                                   const options = url.parse(request.url, true).query;
                                   response.write("<h1> URL = " + request.url + "</h1>");
                                   response.write("<h2> options = " + JSON.stringify(options) + "</h2>");
                                   response.write("Hello, <b>world!</b>");
                                   response.end();
                               }));
server.listen(8080);
