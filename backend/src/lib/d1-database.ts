import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'
import { kvRepository } from '../repository/kv'
import { seminarRepository } from '../repository/seminar'
import type { Database } from '../types'

let db: Kysely<Database> | null = null

export function d1Database(database: D1Database) {
  if (!db) {
    const d1Dialect = new D1Dialect({ database })
    db = new Kysely<Database>({ dialect: d1Dialect })
  }

  return {
    seminar: seminarRepository(db),
    kv: kvRepository(db)
  }
}
