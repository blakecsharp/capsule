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

const processSignUp = functions.auth.user().onCreate((user) => {
  const newUserObj = {
    id: user.uid,
    email: user.email,
    // displayName: user.displayName,
    // photoURL: user.photoURL,
    // phoneNumber: user.phoneNumber,
    creationTime: user.metadata.creationTime,
    // lastSignInTime: user.lastSignInTime,
  };
  console.log("PROCESS SIGN UP newUserObj", newUserObj);

  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(newUserObj)
    .then((writeResult) => {
      console.log("User Created result:", writeResult);
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

module.exports = { api, processSignUp };
