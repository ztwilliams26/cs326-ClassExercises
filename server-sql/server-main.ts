'use strict';

import { Database } from './postgres-database';
import { MyServer } from './myserver';

const theDatabase = new Database('somedatabase');
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
