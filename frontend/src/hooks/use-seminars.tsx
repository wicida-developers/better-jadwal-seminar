import { lastUpdatedAtom, seminarsAtom } from '@/stores'
import * as api from '@/utils/api'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useSeminars = () => {
  const [seminars, setSeminars] = useAtom(seminarsAtom)
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedAtom)

  const checkLastUpdated = async () => {
    const _lastUpdated = await api.getLastUpdatedInfo()
    if (!lastUpdated || new Date(_lastUpdated) > new Date(lastUpdated)) {
      setLastUpdated(_lastUpdated)
      return true
    }

    return false
  }

  const fetchSeminars = async () => {
    const seminars = await api.getAllSeminars()
    setSeminars(seminars)
  }

  useEffect(() => {
    ;(async () => {
      const isNeedToUpdate = await checkLastUpdated()
      if (!seminars.length || isNeedToUpdate) {
        await fetchSeminars()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdated])

  return { seminars, lastUpdated }
}

export default useSeminars
