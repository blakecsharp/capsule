// Firebase Setup
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const configureServer = require("./configure_server");
const functions = require("firebase-functions");

const server = configureServer();
const api = functions.https.onRequest(server);

module.exports = { api };
