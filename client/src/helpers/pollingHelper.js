let timer = null;

const pollingOn = (doPolling) => {
  if (timer === null) {
    timer = setInterval(doPolling, 1000);
  }
};

const pollingOff = async () => {
  if (timer !== null) {
    await clearInterval(timer);
    timer = null;
  }
};


export {
  pollingOn,
  pollingOff,
};
