const admin = require("firebase-admin");
const { GetData } = require("../data/GetData");
const objectAssignDeep = require("object-assign-deep");

const GetCapsule = async (_, data) => {
  console.log(data);

  const capsuleItems = await GetData("items", [
    {
      property: "capsuleId",
      condition: "==",
      value: data.capsuleId,
    },
  ]);

  if (capsuleItems) {
    return capsuleItems;
  }

  return {
    success: "",
    error: "No items with capsule",
  };
};

exports.GetCapsule = GetCapsule;
