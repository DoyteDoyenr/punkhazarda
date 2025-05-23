import { execSync } from 'node:child_process'

import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'
import { PrismaClient } from '@prisma/client'
import { TestEnvironment } from 'jest-environment-node'
import { v4 as uuid } from 'uuid'

import { env } from '../src/lib/env'

export default class PrismaTestEnvironment extends TestEnvironment {
  private schema: string
  private connectionString: string
  private prisma: PrismaClient

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.schema = `code_schema_${uuid()}`
    this.connectionString = `${env.DATABASE_URL}?schema=${this.schema}`
    this.prisma = new PrismaClient()
  }

  async setup() {
    await super.setup()
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString
    execSync('npx prisma db push')
  }

  async teardown() {
    await super.teardown()
    await this.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await this.prisma.$disconnect()
  }
}
