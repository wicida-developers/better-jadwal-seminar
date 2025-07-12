import { pageAtom, searchAtom } from '@/stores'
import { Seminar } from '@/types'
import { useAtom, useSetAtom } from 'jotai'
import { useSearchParams } from 'react-router'

const useFilter = (data: Seminar[], opts = { major: '', seminarType: '' }) => {
  const [, setSearchParams] = useSearchParams({})

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

  const selectHandler = (selectType: 'major' | 'seminarType', value: string) => {
    setPage(1)
    setSearchParams((prev) => {
      if (!value) {
        prev.delete(selectType)
        return prev
      }

      prev.set(selectType, value)
      return prev
      //   const prevSearchParams = Object.fromEntries(prev.entries())
      //   return {
      //     ...prevSearchParams,
      //     [selectType]: value
      //   }
    })
  }

  return { filteredData, searchHandler, selectHandler }
}

export default useFilter
