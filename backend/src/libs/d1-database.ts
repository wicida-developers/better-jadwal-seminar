export type SeminarRecord = {
  title: string
  seminarType: string
  studentName: string
  major: string
  advisors: string
  examiners: string
  room: string
  datetime: string
}

export function d1Database(d1: D1Database) {
  return {
    seminar: {
      async get(limit: number, offset: number) {
        const stmt = d1.prepare('SELECT * FROM seminars LIMIT ? OFFSET ?').bind(limit.toString(), offset.toString())
        const { results } = await stmt.run<SeminarRecord>()

        const data = results.map(({ advisors, examiners, ...rest }) => ({
          ...rest,
          advisors: advisors.split(';'),
          examiners: examiners.split(';')
        }))

        return data
      },
      async count() {
        const stmt = d1.prepare('SELECT COUNT(*) AS total FROM seminars')
        const { results } = await stmt.run<{ total: number }>()
        return results[0].total
      },
      async update(data: SeminarRecord[]) {
        const stmt = d1.prepare(
          `INSERT INTO seminars 
          (title, studentName, seminarType, major, advisors, examiners, room, datetime)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )

        await d1.batch(
          data.map(({ title, studentName, seminarType, major, advisors, examiners, room, datetime }) =>
            stmt.bind(title, studentName, seminarType, major, advisors, examiners, room, datetime)
          )
        )
      },
      async reset() {
        await d1.exec('DELETE FROM seminars')
      }
    },
    KV: {
      async get(key: string) {
        const stmt = d1.prepare('SELECT value FROM cf_KV WHERE key = ?').bind(key)
        const { results } = await stmt.run<{ value: string }>()
        return results[0].value
      },
      async set(key: string, value: string) {
        await d1
          .prepare(`INSERT INTO cf_KV (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`)
          .bind(key, value)
          .run()
      }
    }
  }
}
