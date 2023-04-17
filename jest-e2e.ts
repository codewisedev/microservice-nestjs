import { pathsToModuleNameMapper } from 'ts-jest';
import 'tsconfig-paths/register';
import { compilerOptions } from './tsconfig.json';
import * as dotenv from 'dotenv';

dotenv.config({ path: './test.env' });

const jestConfig = {
  moduleFileExtensions: ['ts', 'js'],
  preset: 'ts-jest',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  globalSetup: '<rootDir>/test/global-setup.ts',
};

export default jestConfig;
