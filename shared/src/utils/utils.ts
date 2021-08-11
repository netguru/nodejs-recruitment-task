export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function checkEnvVarsExistence(variablesArray: string[]): void {
  let environmentalVariables;

  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'prod':
      environmentalVariables = variablesArray;
      break;
    default:
      environmentalVariables = ['NODE_ENV'];
  }

  environmentalVariables.forEach((name: string) => {
    if (!process.env[name]) {
      throw new Error(`Missing ${name} environmental variable`);
    }
  });
}
