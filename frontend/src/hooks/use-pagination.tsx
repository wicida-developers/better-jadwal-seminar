import { pageAtom } from '@/stores'
import { Seminar } from '@/types'
import { useAtom } from 'jotai'

const usePagination = (data: Seminar[]) => {
  const [currentPage, setCurrentPage] = useAtom(pageAtom)

  const itemsPerPage = 10

  const maxPage = Math.ceil(data.length / itemsPerPage)

  const offset = (currentPage - 1) * itemsPerPage

  const totalItems = data.length

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < maxPage

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return { currentData, nextPage, prevPage, hasPrevPage, hasNextPage, offset, totalItems, resetPage }
}

export default usePagination
