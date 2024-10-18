enum ENV {
  development = "DEV",
  test = "TEST",
  stage = "STAGE",
  production = "PROD",
}

function getEnv(): ENV {
  const env = process.env.NODE_ENV;
  const currentEnv = Object.values(ENV).find((e) => e === env);
  if (currentEnv) {
    return currentEnv;
  }
  return ENV.development;
}

export default {
  env: getEnv(),
  possibleEnviroments: ENV,
};
leEnviroments: ENV
}