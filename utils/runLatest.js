const dataByKey = {};

export function runLatest(key = "", perfomRequest) {
  let data = dataByKey[key];
  if (!data)
    data = dataByKey[key] = {
      nextOperation: null,
      currentPromise: null,
    };
  if (!data.currentPromise)
    data.currentPromise = perfomRequest().finally(
      () => (data.currentPromise = null)
    );
  else {
    data.nextOperation = perfomRequest;
    data.currentPromise.finally(() => {
      if (data.nextOperation) {
        data.currentPromise = data
          .nextOperation()
          .finally((data.nextOperation = null));
      }
    });
  }
}
