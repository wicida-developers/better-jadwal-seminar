export const KVModel = (d1: D1Database) => ({
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
})
