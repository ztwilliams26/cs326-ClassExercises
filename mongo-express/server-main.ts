"use strict";

import { Database } from "./mongo-database";
import { MyServer } from "./myserver-routing";

const theDatabase = new Database("ztwilliams26"); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
