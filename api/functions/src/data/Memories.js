const admin = require("firebase-admin");

const getMemoryData = async (ids) => {
  const memories = [];
  for (const id in ids) {
    if (id) {
      const memory = await admin
        .firestore()
        .collection("memories")
        .doc(id)
        .get();
      memories.push(memory);
    }
  }
  return memories;
};

module.export = {
  getMemoryData,
};
