import { Role } from '../enums/Role';
import { UserDB } from '../interfaces/User';

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

export const users: UserDB[] = [
  {
    id: 123,
    role: Role.basic,
    name: 'Basic Thomas',
    username: 'basic-thomas',
    password: 'sR-_pcoow-27-6PAwCD8',
  },
  {
    id: 434,
    role: Role.premium,
    name: 'Premium Jim',
    username: 'premium-jim',
    password: 'GBLtTyq3E_UNjFnpo9m6',
  },
];
