import { useSearchParams } from 'react-router'
import useFilter from './hooks/use-filter'
import usePagination from './hooks/use-pagination'
import useSeminars from './hooks/use-seminars'
import { majors, seminarTypes } from './utils/constant'
import { datetimeFullFormater, datetimeShortFormater } from './utils/helpers'

const majorBadgeTypes = {
  TI: 'badge-info',
  SI: 'badge-warning',
  BD: 'badge-success'
} as const

function App() {
  const [searchParams] = useSearchParams({})

  const { seminars: allSeminars, lastUpdated } = useSeminars()

  const {
    filteredData: filteredSeminars,
    searchHandler,
    selectHandler
  } = useFilter(allSeminars, {
    major: searchParams.get('major') || '',
    seminarType: searchParams.get('seminarType') || ''
  })

  const {
    currentData: seminars,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    offset,
    totalItems
  } = usePagination(filteredSeminars)

  return (
    <main className="mx-4 py-1.5 max-w-[1384px] lg:mx-auto mb-20 mt-6">
      <h1 className="text-3xl my-4 font-bold">
        Jadwal Seminar{' '}
        <span className="block text-sm text-base-content/75 font-normal sm:inline">
          Terakhir diperbarui: {lastUpdated ? datetimeShortFormater(lastUpdated) : 'Loading...'}
        </span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-2.5">
        <div className="w-full lg:w-1/3 input input-sm shadow-xs">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="Search" onInput={searchHandler} />
        </div>
        <div className="flex gap-x-2.5 w-full">
          <select
            onChange={(ev) => selectHandler('major', ev.currentTarget.value)}
            value={searchParams.get('major') || ''}
            className="w-1/2 lg:w-1/4 select select-sm shadow-xs"
          >
            <option value="">Semua Prodi</option>
            {majors.map((major, i) => (
              <option key={i}>{major}</option>
            ))}
          </select>
          <select
            onChange={(ev) => selectHandler('seminarType', ev.currentTarget.value)}
            value={searchParams.get('seminarType') || ''}
            className="w-1/2 lg:w-1/4 select select-sm shadow-xs"
          >
            <option value="">Semua Tipe Seminar</option>
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
            {!seminars.length ? (
              <tr>
                <td colSpan={8}>No seminars found</td>
              </tr>
            ) : (
              seminars.map(({ studentName, title, seminarType, major, advisors, examiners, room, datetime }, i) => (
                <tr key={i}>
                  <td className="w-2/12">{title}</td>
                  <td className="w-1/12">{seminarType}</td>
                  <td className="w-2/12">{studentName}</td>
                  <td className="w-1/12">
                    {Object.keys(majorBadgeTypes).includes(major) && (
                      <div className={`btn badge badge-sm ${majorBadgeTypes[major]}`}>{major}</div>
                    )}
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
        <button className="join-item btn" onClick={prevPage} disabled={!hasPrevPage}>
          «
        </button>
        <button className="join-item btn">
          {offset + 1} - {offset + seminars.length} of {totalItems}
        </button>
        <button className="join-item btn" onClick={nextPage} disabled={!hasNextPage}>
          »
        </button>
      </div>
    </main>
  )
}

export default App
