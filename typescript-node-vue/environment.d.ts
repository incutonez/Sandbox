/**
 * We need an interface of process.env, so we can use it as a typed class in our TS files
 * See also: https://stackoverflow.com/a/53981706/1253609
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      HOST: string;
      BASE_API_PATH: string;
      UI_DIR: string;
      UI_DIR_PROD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};