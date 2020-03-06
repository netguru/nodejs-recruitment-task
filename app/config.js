const REQUIRED_KEYS = [
  'APP_PORT',
];

const checkRequireKeys = (env) => {
  const envKeys = Object.keys(env);

  REQUIRED_KEYS.forEach(key => {
    if (!envKeys.includes(key)) {
      throw new Error(`Required env key ${key} is missing`);
    }
  });
}

exports.createConfig = (env) => {
  checkRequireKeys(env);

  return Object.freeze({
    appPort: env.APP_PORT,
  })
}
