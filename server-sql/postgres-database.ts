export class Database {
  private pgp = require("pg-promise")();

  // CHANGE THESE TWO LINES
  private uri =
    "postgres://fyfxsghm:Yvi8bsIKfV-zydggab3LckSnuO5oq8WY@drona.db.elephantsql.com:5432/fyfxsghm";
  private dbName: string = "fyfxsghm";

  private db: any;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.db = this.pgp(this.uri);
    console.log("db = " + JSON.stringify(this.db));
    // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.

    /* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
    (async () => {
      try {
        // CREATE THE DATABASE (this might throw an execption).
        // YOUR CODE GOES HERE:
        let result = await this.db.none(
          "create table kv(key varchar(30) primary key, value varchar(30));"
        );
        console.log(JSON.stringify(result));
      } catch (e) {
        // Already created.
      }
    })();
  }

  public async put(key: string, value: string): Promise<void> {
    console.log("put: key = " + key + ", value = " + value);
    try {
      // Try inserting it first. It can fail if the key is already there.
      // INSERT
      // YOUR CODE GOES HERE
      let result = await this.db.none(
        "INSERT INTO kv(key, value) VALUES ($1, $2)",
        [key, value]
      );
    } catch (err) {
      // It was already there; try to update it.
      try {
        // UPDATE
        // YOUR CODE GOES HERE
        let result = await this.db.none(
          "update kv set value = $2 where key = $1",
          [key, value]
        );
      } catch (err) {
        // We should never get here.
        console.log(err);
      }
    }
  }

  public async get(key: string): Promise<string | null> {
    console.log("get: key = " + key);
    try {
      // SELECT
      // YOUR CODE GOES HERE
      let result = await this.db.one("select * from kv where key = $1", [key]);
      console.log("get: returned " + JSON.stringify(result));
      if (result) {
        return result.value;
      } else {
        return null;
      }
    } catch (err) {
      // Failed search.
      return null;
    }
  }

  public async del(key: string): Promise<void> {
    console.log("DELETE");
    try {
      // DELETE
      // YOUR CODE GOES HERE
      let result = await this.db.none("delete from kv where key = $1", [key]);
      console.log("result = " + result);
    } catch (err) {
      // Not found.
    }
  }

  public async isFound(key: string): Promise<boolean> {
    console.log("isFound: key = " + key);
    let v = await this.get(key);
    console.log("is found result = " + v);
    if (v === null) {
      return false;
    } else {
      return true;
    }
  }
}
