import * as functions from "firebase-functions";
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
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

const api = functions.https.onRequest(app);

module.exports = { api };
