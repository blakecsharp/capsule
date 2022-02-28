const { getData } = require("../data/GetData");

const GetCapsule = async (_, data) => {
  console.log(data);

  const capsuleItems = await getData("items", [
    {
      property: "capsuleId",
      condition: "==",
      value: data.capsuleId,
    },
  ]);

  if (capsuleItems) {
    /*
    for (var i = 0; i < capsuleItems.length; i++) {
      const userRef = admin
        .firestore()
        .collection("users")
        .doc(capsuleItems[i].uploadedBy);
      const user = await userRef.get();
      if (!user.exists) {
        return {
          success: "",
          error: "couldn't find user",
        };
      }
      const userData = user.data();
      capsuleItems.uploadedBy = {
        firstName: userData.firstName,
      };
    }
    */
    return capsuleItems;
  }

  return {
    success: "",
    error: "No items with capsule",
  };
};

exports.GetCapsule = GetCapsule;
