const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const commonResponse = (success, data, error) => {
  if (error) {
    return {
      success,
      error,
    };
  }

  return {
    success,
    data,
  };
};

module.exports = {
  commonResponse,
  isEmpty,
};
