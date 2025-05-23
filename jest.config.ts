import type { Config } from 'jest'
import { createDefaultPreset } from 'ts-jest'

const tsJestTransformCfg = createDefaultPreset().transform
const isE2E = process.env.TEST_E2E === 'true'

export default {
  preset: 'ts-jest',
  testEnvironment: isE2E ? '<rootDir>/prisma/prisma-environment-jest.ts' : 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: isE2E ? ['**/src/http/**/*.spec.ts'] : ['**/?(*.)+(spec|test).[jt]s?(x)'],
} satisfies Config
