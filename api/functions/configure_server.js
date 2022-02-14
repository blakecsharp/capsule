const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./src/schema");
const resolvers = require("./src/resolvers");

function configureServer() {
  // invoke express to create our server
  const app = express();
  // cors allows our server to accept requests from different origins
  app.use(cors({ origin: true }));
  app.options("*", cors());

  // setup server

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    introspection: true, // so we can access the playground in production reference: https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructor-options-lt-ApolloServer-gt
    playground: true,
    engine: {
      debugPrintReports: true,
    },
  });
  server.applyMiddleware({ app, path: "/", cors: true });

  return app;
}

module.exports = configureServer;
