const admin = require("firebase-admin");

const CreateCapsule = async (_, data) => {
  try {
    const res = await admin.firestore().collection("capsules").add({
      createdById: data.createdById,
      title: data.title,
    });

    await admin
      .firestore()
      .collection("capsules")
      .doc(res.id)
      .update({ id: res.id });

    await admin
      .firestore()
      .collection("users")
      .doc(data.createdById)
      .update({
        capsuleIds: admin.firestore.FieldValue.arrayUnion(res.id),
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
exports.CreateCapsule = CreateCapsule;
