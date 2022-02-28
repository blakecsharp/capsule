/* eslint comma-dangle: "off" */
const admin = require("firebase-admin");
const objectAssignDeep = require("object-assign-deep");

const getData = async (collectionName, wherePairs) => {
  let query = admin.firestore().collection(collectionName);

  for (let i = 0; i < wherePairs.length; i++) {
    query = query.where(
      wherePairs[i].property,
      wherePairs[i].condition,
      wherePairs[i].value
    );
  }

  return query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        const results = [];
        querySnapshot.forEach((doc) => {
          const docId = doc.id;
          const docData = doc.data();
          // doc.data() is never undefined for query doc snapshots
          results.push(objectAssignDeep({}, { id: docId }, docData));
        });
        return results;
      } else {
        return new Error(`[${collectionName}] Documents do not exist`);
      }
    })
    .catch((err) =>
      console.log(`[${collectionName}] Error getting document`, err)
    );
};
exports.getData = getData;
