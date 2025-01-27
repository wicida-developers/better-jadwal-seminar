import '@/App.css'
import * as api from '@/utils/api'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { lastUpdatedAtom, searchAtom, seminarsAtom } from './stores'

function App() {
  const [seminars, setSeminars] = useAtom(seminarsAtom)
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchAtom)

  useEffect(() => {
    async function checkLastUpdated() {
      const _lastUpdated = await api.getLastUpdatedInfo()

      if (!lastUpdated || new Date(_lastUpdated) > new Date(lastUpdated)) {
        setLastUpdated(_lastUpdated)
        return true
      }

      return false
    }

    async function fetchSeminars() {
      const seminars = await api.getAllSeminars()
      setSeminars(seminars)
    }

    ;(async () => {
      const isNeedToUpdate = await checkLastUpdated()
      if (!seminars.length || isNeedToUpdate) {
        await fetchSeminars()
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const seminarList = seminars.filter(({ studentName, title, seminarType, advisors, examiners, room }) => {
    return (
      studentName.toLowerCase().includes(searchQuery) ||
      title.toLowerCase().includes(searchQuery) ||
      seminarType.toLowerCase().includes(searchQuery) ||
      advisors.join(' ').toLowerCase().includes(searchQuery) ||
      examiners.join(' ').toLowerCase().includes(searchQuery) ||
      room.toLowerCase().includes(searchQuery)
    )
  })

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(ev.target.value.toLowerCase())
  }

  return (
    <>
      <h2>
        Jadwal Seminar |{' '}
        <small>
          Terakhir diperbarui: {new Date(lastUpdated).toLocaleString('ID', { dateStyle: 'medium', timeStyle: 'short' })}
        </small>
      </h2>
      <br />
      <input className="search" type="text" onInput={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Seminar Type</th>
            <th>Student Name</th>
            <th>Major</th>
            <th>Advisors</th>
            <th>Examiners</th>
            <th>
              Schedule <small>(Date)</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {!seminarList.length ? (
            <tr>
              <td colSpan={8}>No seminars found</td>
            </tr>
          ) : (
            seminarList
              .slice(0, 10)
              .map(({ studentName, title, seminarType, major, advisors, examiners, room, datetime }, i) => (
                <tr key={i}>
                  <td>{title}</td>
                  <td>{seminarType}</td>
                  <td>{studentName}</td>
                  <td>{major}</td>
                  <td className="al">
                    <ul>
                      {advisors.map((advisor, i) => {
                        return <li key={i}>{advisor}</li>
                      })}
                    </ul>
                  </td>
                  <td className="al">
                    <ul>
                      {examiners.map((examiner, i) => {
                        return <li key={i}>{examiner}</li>
                      })}
                    </ul>
                  </td>
                  <td className="al">
                    {room}
                    {';'} <br />
                    {new Date(datetime).toLocaleDateString('ID', { dateStyle: 'full' })}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => {}} disabled>
          Prev
        </button>
        <span>1-10 of {seminarList.length} seminars</span>
        <button onClick={() => {}} disabled>
          Next
        </button>
      </div>
    </>
  )
}

export default App
