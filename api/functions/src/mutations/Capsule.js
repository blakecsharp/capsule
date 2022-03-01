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

const JoinCapsule = async (_, data) => {
  console.log(data);
  const userRef = admin.firestore().collection("users").doc(data.userId);
  const userData = await userRef.get();
  if (!userData) {
    return {
      success: "",
      error: "Invalid user ID",
    };
  }
  if (userData.data().capsuleIds.includes(data.capsuleId)) {
    return {
      success: "",
      error: "User already belongs to the capsule",
    };
  }

  await admin
    .firestore()
    .collection("users")
    .doc(data.userId)
    .update({
      capsuleIds: admin.firestore.FieldValue.arrayUnion(data.capsuleId),
    });
};

exports.JoinCapsule = JoinCapsule;
exports.CreateCapsule = CreateCapsule;
