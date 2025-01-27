import * as api from '@/utils/api'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { lastUpdatedAtom, searchAtom, seminarsAtom } from './stores'
import { majors, seminarTypes } from './utils/cosntant'
import { datetimeFullFormater, datetimeShortFormater } from './utils/helpers'

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
    <main className="mx-4 max-w-[1384px] lg:mx-auto mb-12 mt-6">
      <h1 className="text-3xl my-4 font-bold">
        Jadwal Seminar{' '}
        <span className="text-sm text-base-content/75 font-normal">
          Terakhir diperbarui: {lastUpdated ? datetimeShortFormater(lastUpdated) : 'Loading...'}
        </span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-2.5">
        <label className="w-full lg:w-1/3 input input-sm shadow-xs">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="Search" onInput={handleSearch} />
        </label>
        <div className="flex gap-x-2.5 w-full">
          <select
            onChange={(ev) => alert(ev.currentTarget.value)}
            className="w-1/2 lg:w-1/4 select select-sm shadow-xs"
          >
            <option disabled selected value="">
              Pilih Prodi
            </option>
            {majors.map((major, i) => (
              <option key={i}>{major}</option>
            ))}
          </select>
          <select
            onChange={(ev) => alert(ev.currentTarget.value)}
            className="w-1/2 lg:w-1/4 select select-sm shadow-xs"
          >
            <option disabled selected value="">
              Pilih Tipe Seminar
            </option>
            {seminarTypes.map((type, i) => (
              <option key={i}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto my-4 rounded-lg border border-base-content/5 bg-base-100 shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>
                Tipe <br />
                Seminar
              </th>
              <th>Mahasiswa</th>
              <th>Prodi</th>
              <th>Pembimbing</th>
              <th>Penguji</th>
              <th>Jadwal & Ruangan</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {!seminarList.length ? (
              <tr>
                <td colSpan={8}>No seminars found</td>
              </tr>
            ) : (
              seminarList
                .slice(0, 10)
                .map(({ studentName, title, seminarType, major, advisors, examiners, room, datetime }, i) => (
                  <tr key={i}>
                    <td className="w-2/12">{title}</td>
                    <td className="w-1/12">{seminarType}</td>
                    <td className="w-2/12">{studentName}</td>
                    <td className="w-1/12">
                      {major === 'TI' && <div className="badge badge-sm badge-info">TI</div>}
                      {major === 'SI' && <div className="badge badge-sm badge-warning">SI</div>}
                      {major === 'BD' && <div className="badge badge-sm badge-success">BD</div>}
                    </td>
                    <td className="w-2/12">
                      <ul className="list-disc">
                        {advisors.map((advisor, i) => (
                          <li key={i}>{advisor}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="w-2/12">
                      <ul className="list-disc">
                        {examiners.map((examiner, i) => (
                          <li key={i}>{examiner}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="w-2/12">
                      {room}
                      {';'} <br />
                      {datetimeFullFormater(datetime)}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end">
        <button className="join-item btn" onClick={() => {}}>
          «
        </button>
        <button className="join-item btn">1-10 of {seminarList.length}</button>
        <button className="join-item btn" onClick={() => {}}>
          »
        </button>
      </div>
    </main>
  )
}

export default App
