/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');


// import { pathsToModuleNameMapper } from 'ts-jest';
// import tsconfig from './tsconfig.json' assert { type: "json" }

// const { compilerOptions } = tsconfig

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};