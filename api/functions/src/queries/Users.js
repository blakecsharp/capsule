const admin = require("firebase-admin");
const { getData } = require("../data/GetData");
const objectAssignDeep = require("object-assign-deep");

const GetUser = async (_, data) => {
  const userInformation = await admin
    .firestore()
    .collection("users")
    .doc(data.userId)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        const error = new Error(`User "${data.userId}" does not exist.`);
        console.log(error);
        return null;
      }
    })
    .catch((err) => {
      /* eslint comma-dangle: "off" */
      console.log(
        err,
        `Data call getUserData failed for userId: ${data.userId}`
      );
      return null;
    });
  const capsules = [];
  for (let i = 0; i < userInformation.capsuleIds.length; i++) {
    const cap = await getData("capsules", [
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
      const capItems = await getData("items", [
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
