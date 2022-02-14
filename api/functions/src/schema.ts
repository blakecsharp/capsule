const { gql } = require("apollo-server-express");

const fs = require("fs");
const path = require("path");
const schemaPath = path.join(__dirname, "schema.graphql");
const data = fs.readFileSync(schemaPath);

const typeDefs = gql(data.toString());

module.exports = typeDefs;
