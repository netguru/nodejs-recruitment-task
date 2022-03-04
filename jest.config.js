module.exports = {
  roots: ['<rootDir>/movie-service/src/tests'],
  testMatch: ['./tests/specs/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  "preset": "@shelf/jest-mongodb",
  "testEnvironment": "node"
}
