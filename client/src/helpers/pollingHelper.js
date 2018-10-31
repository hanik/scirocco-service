let timer = null;

const pollingOn = (doPolling) => {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(doPolling, 1000);
};

const pollingOff = () => {
  if (timer !== null) {
    clearInterval(timer);
  }
};


export {
  pollingOn,
  pollingOff,
};
