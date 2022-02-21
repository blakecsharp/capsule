const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-cloud-functions");
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
    context: ({ req, res }) => ({
      headers: req.headers,
      req,
      res,
    }),
  });
  return server;
  // return app;
}

module.exports = configureServer;
