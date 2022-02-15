// const admin = require("firebase-admin");

const AddUser = async (_, data) => {
  try {
    console.log("hey");
    console.log(data);
    return {
      success: "Sucess",
      error: "",
    };
  } catch (error) {
    throw new ApolloError(`Resolver Query UpdateUser() ${error}`);
  }
};

module.export = {
  AddUser,
};
