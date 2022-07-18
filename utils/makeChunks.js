const makeChunks = (array, chunkSize) => {
  const res = [];
  for (let i = 0; i < Math.ceil(array.length / chunkSize); i += 1) {
    const start = i * chunkSize;
    const subArray = array.slice(start, start + chunkSize);
    res.push(subArray);
  }
  return res;
};

module.exports = makeChunks;
