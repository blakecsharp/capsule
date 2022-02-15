const admin = require("firebase-admin");

const getItemData = async (id) => {
  return await admin
    .firestore()
    .collection("items")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        const error = new Error(`Iem "${id}" does not exist`);
        return error;
      }
    })
    .catch((error) => {
      return error;
    });
};

module.export = {
  getItemData,
};
