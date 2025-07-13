import { Kysely } from 'kysely'
import type { Database } from '../types'

export const kvRepository = (db: Kysely<Database>) => ({
  async getValue(key: string) {
    const result = await db.selectFrom('cf_KV').select('value').where('key', '=', key).executeTakeFirst()
    return result?.value || null
  },

  async setValue(key: string, value: string) {
    await db
      .insertInto('cf_KV')
      .values({ key, value })
      .onConflict((oc) => oc.column('key').doUpdateSet({ value: (eb) => eb.ref('excluded.value') }))
      .execute()
  }
})
