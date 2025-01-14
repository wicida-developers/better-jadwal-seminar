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

  const page = Number(c.req.query('page') || '1')
  const limit = Number(c.req.query('limit') || '10')
  const offset = (page - 1) * limit

  const seminars = await db.seminar.getAll()
  const paginatedSeminars = seminars.slice(offset, offset + limit)

  const lastUpdated = await db.KV.get('last_updated')

  return c.json({
    success: true,
    meta: {
      page,
      limit,
      pageCount: Math.ceil(seminars.length / limit),
      total: seminars.length
    },
    data: {
      lastUpdated,
      seminars: paginatedSeminars
    }
  })
})

export default {
  fetch: app.fetch,
  scheduled: scheduler
}
