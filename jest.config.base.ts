import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export const baseJestConfig = {
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'js', 'json'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  testMatch: ['**/*.spec.ts'],
};   