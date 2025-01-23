import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { d1Database } from './libs/d1-database'
import { scheduler } from './scheduler'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(logger())
app.use(cors({ origin: '*' }))

app.get('/seminars', async (c) => {
  const db = d1Database(c.env.DB)

  const seminars = await db.seminar.getAll()
  const lastUpdated = await db.KV.get('last_updated')

  return c.json({
    success: true,
    data: {
      lastUpdated,
      seminars
    }
  })
})

export default {
  fetch: app.fetch,
  scheduled: scheduler
}
