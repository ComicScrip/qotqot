const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const asyncOperation = (arg) => {
  console.log("begin with", arg);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("done for", arg);
      resolve();
    }, 1000);
  });
};

const makeChunks = (array, chunkSize) => {
  const res = [];
  for (let i = 0; i < Math.ceil(array.length / chunkSize); i += 1) {
    const start = i * chunkSize;
    const subArray = array.slice(start, start + chunkSize);
    res.push(subArray);
  }
  return res;
};

async function main() {
  const chunks = makeChunks(array, 3);
  // [[1, 2], [3, 4], [5]]
  for (let chunk of chunks) {
    await asyncOperation(chunk);
  }
}

main();
