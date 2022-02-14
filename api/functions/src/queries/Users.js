const admin = require("firebase-admin");

const GetUser = async (userId) => {
  return await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        const error = new Error(`User "${userId}" does not exist.`);
        console.log(error);
        return null;
      }
    })
    .catch((err) => {
      console.log(err, `Data call getUserData failed for userId: ${userId}`);
      return null;
    });
};

module.export = {
  GetUser,
};
