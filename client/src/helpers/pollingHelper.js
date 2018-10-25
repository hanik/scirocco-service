
let timer;

const pollingOn = () => {
  timer = setInterval(async () => {
    // TODO
  }, 5000);
};

const pollingOff = () => {
  clearInterval(timer);
};


export {
  pollingOn,
  pollingOff,
};
