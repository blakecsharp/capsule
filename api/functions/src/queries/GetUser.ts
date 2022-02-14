const admin = require("firebase-admin");

const getUserData = async (userId: string) => {
  return await admin
    .firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("error", doc);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
