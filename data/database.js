const { MongoClient } = require("mongodb");

let mongodbUrl = "mongodb://127.0.0.1:27017/";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

let database;

async function connectToDatabase() {
  const client = new MongoClient(mongodbUrl);
  await client.connect();
  database = client.db("online-shop");

  return "done.";
}

function getDb() {
  if (!database) {
    throw new Error("you must connect first");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
