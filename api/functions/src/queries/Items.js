const admin = require("firebase-admin");
const { GetData } = require("../data/GetData");
const objectAssignDeep = require("object-assign-deep");

const GetItem = async (_, data) => {
  console.log(data);

  const item = await GetData("items", [
    {
      property: "id",
      condition: "==",
      value: data.itemId,
    },
  ]);

  if (item.length == 1) {
    return item[0];
  }

  return {
    success: "",
    error: "Too many items with the same id",
  };
};

exports.GetItem = GetItem;
