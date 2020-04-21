"use strict";

import { Database } from "./mongo-database";
import { MyServer } from "./myserver-post";

const theDatabase = new Database("ztwilliams26"); // CHANGE THIS
const theServer = new MyServer(theDatabase);

console.log("\nOpening server at localhost:8080 now...\n");
theServer.listen(8080);
