import * as cheerio from 'cheerio'
import { d1Database } from './libs/d1-database'

const LOGIN_URL = 'https://siak.wicida.ac.id/kpst/cek_login.php'
const SCHEDULE_URL = 'https://siak.wicida.ac.id/kpst/index.php?menu=jadwal'

const login = async (username: string, password: string) => {
  const formData = new FormData()

  formData.append('username', username)
  formData.append('password', password)

  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    body: formData
  })

  const loginResult = await response.text()
  if (loginResult.startsWith('Password Tidak Sesuai')) {
    return null
  }

  const cookie = response.headers.get('set-cookie')?.split(';')[0]
  return cookie as string
}

const parseSchedulePage = async (htmlPage: string) => {
  const $ = cheerio.load(htmlPage)

  const rawData = $('tr > td')
    .map((_, element) => $(element).text())
    .get()

  const seminars = rawData
    .reduce((acc, _, index) => {
      if (index % 5 === 0) {
        acc.push(rawData.slice(index, index + 5))
      }
      return acc
    }, [] as string[][])
    // remove trailing whitespace
    .map((row) => {
      return row.map((str) => str.replace(/\s+/g, ' ').trim())
    })
    // convert to object
    .map(([_datetime, seminarType, _studentName, major, _title]) => {
      const studentName = _studentName.replace(/^[\d\s]+/g, '')

      const [title, lecturers] = _title.split('Pembimbing Utama =').map((str) => str.trim())
      const lecturerList = lecturers
        .replace(/\b(Pembimbing Pendamping =|(Ketua|Anggota) Penguji =)\s*/g, '|')
        .split('|')
        .map((str) => str.trim())

      const advisors = lecturerList.slice(0, lecturerList.length <= 2 ? 1 : 2).join(';')
      const examiners = lecturerList.slice(lecturerList.length <= 2 ? 1 : 2).join(';')

      const datetime = _datetime.replace(
        /.*(\d{2}) \/ (\d{2}) \/ (\d{4}) Jam (\d+)[.|:](\d+).*/,
        '$3-$2-$1T$4:$5:00+08:00'
      )
      const isoDateFormatted = new Date(datetime).toISOString()

      const room = _datetime.split(/00|30/).pop() || ''

      return {
        title,
        seminarType,
        studentName,
        major,
        advisors,
        examiners,
        room,
        datetime: isoDateFormatted
      }
    })

  return seminars
}

export const scheduler = async (event: ScheduledEvent, env: Env, ctx: ExecutionContext) => {
  const cookie = await login(env.USERNAME, env.PASSWORD)
  if (!cookie) {
    console.error('Login failed')
    return
  }

  const response = await fetch(SCHEDULE_URL, {
    headers: { cookie }
  })

  const schedulePage = await response.text()

  const data = await parseSchedulePage(schedulePage)

  // console.log(data)
  const db = d1Database(env.DB)

  await db.seminar.reset()
  await db.seminar.update(data)
  await db.KV.set('last_updated', new Date().toISOString())
}
