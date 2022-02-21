const admin = require("firebase-admin");
const objectAssignDeep = require("object-assign-deep");

const GetUser = async (_, data) => {
  console.log(data);
  return await admin
    .firestore()
    .collection("users")
    .doc(data.userId)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        /*console.log(doc.data().capsuleIds);
        let capsules = [];
        for (var i = 0; i < doc.data().capsuleIds.length; i++) {
          let query = await admin
            .firestore()
            .collection("items")
            .where("capsuleId", "==", capsuleId)
            .get();
          console.log(query);
        } */
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

exports.GetUser = GetUser;
