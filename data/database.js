const { MongoClient } = require("mongodb");

let mongodbUrl = "mongodb://0.0.0.0:27017/";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

let database;

async function connectToDatabase() {
  const client = new MongoClient(
    "mongodb+srv://duythong:22521429@database.apzn3yo.mongodb.net/database?retryWrites=true&w=majority"
  );
  try {
    await client.connect();
    database = client.db("online-shop");
  } catch (error) {
    next(error);
    return;
  }

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
