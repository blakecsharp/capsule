const admin = require("firebase-admin");
const { GetData } = require("../data/GetData");
const objectAssignDeep = require("object-assign-deep");

const GetUser = async (_, data) => {
  console.log(data);
  let userInformation = await admin
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
            .collection("capsules")
            .where("id", "==", doc.data().capsuleIds[i])
            .get()
            .then(async (cap) => {
              console.log(cap.data());
              if (cap.exists) {
                return cap.data();
              }
            });
          console.log(query);
        }*/
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
  capsules = [];
  for (var i = 0; i < userInformation.capsuleIds.length; i++) {
    const cap = await GetData("capsules", [
      {
        property: "id",
        condition: "==",
        value: userInformation.capsuleIds[i],
      },
    ]);
    if (cap.length == 1) {
      console.log(
        "found capsule where id matches",
        userInformation.capsuleIds[i]
      );
      const capItems = await GetData("items", [
        {
          property: "capsuleId",
          condition: "==",
          value: cap[0].id,
        },
      ]);
      console.log(capItems);
      capsules.push(
        objectAssignDeep(
          {},
          { id: cap[0].id },
          { title: cap[0].title },
          { items: capItems }
        )
      );
    }
  }
  userInformation.capsules = capsules;
  console.log(userInformation);
  return userInformation;
};

exports.GetUser = GetUser;
