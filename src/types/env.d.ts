declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      SECRET: string;
      OMDB_API_KEY: string;
    }
  }
}

export {}
