const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

function createSessionConfig() {
  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/",
    collection: "sessions",
    database: "online-shop",
  });
  return {
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  };
}

module.exports = createSessionConfig;
