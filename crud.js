let http = require('http'); // the http server                                                                                
let url = require('url'); // url management 
const headerText = {"Content-Type" : "text/html"}; // serve HTML pages                                                        
let server = http.createServer(((request,response) =>
                               {
                                   response.writeHead(200, headerText);
                                    if (request.url.startsWith("/es")) {
                                       response.write("Hola, <b>mundo!</b>");
                                   } else {
                                       response.write("Hello, <b>world!</b>");
                                   }

                                   response.end();
                               }));
server.listen(8080);
