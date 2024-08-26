export const checkString = (data: string) => {
  const newData = data;
  const newArr = [];
  const inputData = "ократ".split("");
  const usedIndexes = new Set();

  for (let i = 0; i < inputData.length; i++) {
    if (i >= newData.length) {
      break;
    }

    const char = inputData[i];
    const indicesInNewData = [];

    for (let j = 0; j < newData.length; j++) {
      if (newData[j] === char) {
        indicesInNewData.push(j);
      }
    }
    for (const index of indicesInNewData) {
      if (!usedIndexes.has(index)) {
        if (char === newData[i]) {
          newArr.push({
            item: i,
            isPlace: true,
          });
        } else {
          newArr.push({
            item: i,
            isPlace: false,
          });
        }
        usedIndexes.add(index);
        break;
      }
    }
  }
  return newArr;
};
