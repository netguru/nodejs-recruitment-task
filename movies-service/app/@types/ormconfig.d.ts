declare module "@ormconfig" {
  import { ConnectionOptions } from "typeorm";

  type Augmentation = { getConfig: (env: string) => ConnectionOptions };
  type AugmentedConnectionOptions = ConnectionOptions & Augmentation;

  const x: AugmentedConnectionOptions;
  export default x;
}
