import { Kysely } from 'kysely'
import type { Database, SeminarInsert } from '../types'

export const seminarRepository = (db: Kysely<Database>) => ({
  async getSeminars({ limit, offset }: { limit?: number; offset?: number } = {}) {
    let query = db.selectFrom('seminars').selectAll()

    console.log(limit, offset)
    if ((limit && offset === undefined) || (offset !== undefined && !limit)) {
      throw new Error('Both limit and offset must be provided together')
    }

    console.log(limit, offset)
    if (limit && offset) {
      query = query.limit(limit).offset(offset)
    }

    const results = await query.execute()

    return results.map(({ advisors, examiners, ...rest }) => ({
      ...rest,
      advisors: advisors.split(';'),
      examiners: examiners.split(';')
    }))
  },

  async getSeminarTotal() {
    const result = await db
      .selectFrom('seminars')
      .select((eb) => eb.fn.count('seminars.title').as('total'))
      .executeTakeFirst()

    return Number(result?.total)
  },

  async addSeminars(seminars: SeminarInsert[]) {
    const chunkSize = 10
    const chunks = seminars.reduce((acc, _, index, array) => {
      if (index % chunkSize === 0) acc.push(array.slice(index, index + chunkSize))
      return acc
    }, [] as SeminarInsert[][])

    for (const chunk of chunks) {
      await db.insertInto('seminars').values(chunk).execute()
    }
  },

  async resetSeminars() {
    await db.deleteFrom('seminars').execute()
  }
})
