import { pageAtom, searchAtom } from '@/stores'
import { Seminar } from '@/types'
import { useAtom, useSetAtom } from 'jotai'

const useSearch = (data: Seminar[], opts = { major: '', seminarType: '' }) => {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom)

  const setPage = useSetAtom(pageAtom)

  const filteredData = data.filter(({ studentName, title, advisors, examiners, room, seminarType, major }) => {
    const searchMatch =
      studentName.toLowerCase().includes(searchQuery) ||
      title.toLowerCase().includes(searchQuery) ||
      advisors.join(' ').toLowerCase().includes(searchQuery) ||
      examiners.join(' ').toLowerCase().includes(searchQuery) ||
      room.toLowerCase().includes(searchQuery)

    const seminarTypeMatch = !opts.seminarType || seminarType === opts.seminarType
    const majorMatch = !opts.major || major === opts.major

    return searchMatch && seminarTypeMatch && majorMatch
  })

  const searchHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchQuery(ev.target.value.toLowerCase())
  }

  return { filteredData, searchHandler }
}

export default useSearch
