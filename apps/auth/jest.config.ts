import { baseJestConfig } from '../../jest.config.base';

export default {
  ...baseJestConfig,
  displayName: 'auth',
  rootDir: '.',
  preset: '../../jest.preset.js',
};