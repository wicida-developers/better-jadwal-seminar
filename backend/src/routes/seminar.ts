import { Hono } from 'hono'
import { d1Database } from '../lib/d1-database'

type Bindings = {
  DB: D1Database
}

const seminarRouter = new Hono<{ Bindings: Bindings }>()

seminarRouter.get('/', async (c) => {
  try {
    const db = d1Database(c.env.DB)

    const total = await db.seminar.count()
    const page = Number(c.req.query('page')) || 1
    const limit = Number(c.req.query('limit')) || 10
    const offset = (page - 1) * limit
    const pageSize = Math.ceil(total / limit)

    const seminars = await db.seminar.get(limit, offset)

    return c.json({
      success: true,
      meta: {
        limit,
        page,
        pageSize
      },
      data: {
        seminars
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ success: false, message: error.message }, 500)
    }
  }
})

seminarRouter.get('/all', async (c) => {
  try {
    const db = d1Database(c.env.DB)

    const seminars = await db.seminar.getAll()

    return c.json({
      success: true,
      data: {
        seminars
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ success: false, message: error.message }, 500)
    }
  }
})

seminarRouter.get('/last-updated', async (c) => {
  try {
    const db = d1Database(c.env.DB)
    const lastUpdated = await db.KV.get('last_updated')

    return c.json({
      success: true,
      data: {
        lastUpdated
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ success: false, message: error.message }, 500)
    }
  }
})

export default seminarRouter
