const admin = require("firebase-admin");

const AddItem = async (_, data) => {
  try {
    console.log(data);

    const memories = [];
    for (let i = 0; i < data.textMemories.length; i++) {
      memories.push({
        addedBy: data.uploadedBy,
        text: data.textMemories[i],
        typeOfMemory: "TEXT",
      });
    }

    for (let j = 0; j < data.audio.length; j++) {
      memories.push({
        addedBy: data.uploadedBy,
        audio: data.audio[j],
        typeOfMemory: "AUDIO",
      });
    }

    const res = await admin.firestore().collection("items").add({
      uploadedBy: data.uploadedBy,
      date: data.date,
      location: data.location,
      title: data.title,
      memories: memories,
      photos: data.images,
      capsuleId: data.capsuleId,
      mementoType: data.mementoType,
    });

    console.log("Added document with ID: ", res.id);

    await admin
      .firestore()
      .collection("items")
      .doc(res.id)
      .update({ id: res.id });

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

const DeleteItem = async (_, data) => {
  const res = await admin
    .firestore()
    .collection("items")
    .doc(data.itemId)
    .delete();

  if (res) {
    return {
      success: "Successfully deleted",
      error: "",
    };
  }
};

const EditItem = async (_, data) => {
  let memory;

  if (data.textMemory) {
    memory = {
      addedBy: data.addedBy,
      text: data.textMemory,
      typeOfMemory: "TEXT",
    };
  } else if (data.audio) {
    memory = {
      addedBy: data.addedBy,
      audio: data.audio,
      typeOfMemory: "AUDIO",
    };
  }

  console.log(memory);

  await admin
    .firestore()
    .collection("items")
    .doc(data.itemId)
    .update({
      memories: admin.firestore.FieldValue.arrayUnion(memory),
    });

  return {
    success: "Success",
    error: "",
  };
};

exports.AddItem = AddItem;
exports.DeleteItem = DeleteItem;
exports.EditItem = EditItem;
