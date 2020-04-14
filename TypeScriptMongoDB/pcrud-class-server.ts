"use strict";
import { Database } from "./mongo-database";
import { MyServer } from "./myserver";
const theDatabase = new Database("ztwilliams26");
const theServer = new MyServer(theDatabase);
theServer.listen(8080);
