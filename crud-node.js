let http = require('http');
let url = require('url');
const headerText = {"Content-Type" : "text/html"};
let counter = {}; // VARIABLE TO HOLD STUFF, LIKE counter[foo]
let server = http.createServer(((request,response) =>
                               {
                                   response.writeHead(200, headerText);
                                   const options = url.parse(request.url, true).query;
                                   response.write(JSON.stringify(options)+"</br>"); // debugging
                                   if (request.url.startsWith("/create")) {
                                       counter[options.name]=0; 
                                       response.write("Counter "+options.name+" created</br>");
                                       return;
                                   }
                                   if (!(options.name in counter)) {
                                      response.write("Not a current counter</br>");
                                       // OUTPUT ERROR MESSAGE HERE
                                       return;
                                   }
                                   if (request.url.startsWith("/read")) {
                                      response.write(options.name +"'s value is "+counter[options.name]+"</br>");
                                      return;
                                       // OUTPUT THE CURRENT VALUE
                                   } else if (request.url.startsWith("/update")) {
                                      counter[options.name]++;
                                      response.write("Updated "+options.name+" to "+counter[options.name]+"<br>");
                                      return;
                                       // INCREMENT THE COUNTER AND OUTPUT IT
                                   } else if (request.url.startsWith("/delete")) {
                                      delete counter[options.name];
                                      response.write(options.name+" deleted</br>");
                                      return;
                                       // DELETE THE COUNTER AND OUTPUT A MESSAGE
                                   } else {
                                       response.write("<h1>no command found.</h1>");
                                       return;
                                   }
                                   response.end();
                               }));
server.listen(8080);
