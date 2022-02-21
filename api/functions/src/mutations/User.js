const admin = require("firebase-admin");

const AddUser = async (_, data) => {
  try {
    data.capsuleIds = [];
    const res = await admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .set(data)
      .then((writeResult) => {
        console.log("User Created result:", writeResult);
      })
      .catch((err) => {
        console.log(err);
        return {
          success: "",
          error: err.toString(),
        };
      });
    return {
      success: "Sucess",
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: "",
      error: error.toString(),
    };
  }
};
exports.AddUser = AddUser;
