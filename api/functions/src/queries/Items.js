const ItemData = require("../data/Items");
const MemoryData = require("../data/Memories");

const GetItem = async (id) => {
  const item = await ItemData.getItemData(id);
  const memories = await MemoryData.getMemoryData(item.memories);
  item.memories = memories;

  return item;
};

module.export = {
  GetItem,
};
