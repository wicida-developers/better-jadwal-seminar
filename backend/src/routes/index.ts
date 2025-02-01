import { Hono } from 'hono'
import seminarRouter from './seminar'

const indexRouter = new Hono()

indexRouter.route('/seminars', seminarRouter)

export default indexRouter
