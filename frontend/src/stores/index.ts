import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Seminar } from '../types'

export const seminarsAtom = atomWithStorage<Seminar[]>(
  'seminars',
  localStorage.getItem('seminars') ? JSON.parse(localStorage.getItem('seminars') as string) : []
)

export const searchAtom = atom<string>('')

export const pageAtom = atom(1)

export const lastUpdatedAtom = atomWithStorage<string>(
  'lastUpdated',
  // idk why it store ""string"" in localStorage, so it needs to be parsed
  localStorage.getItem('lastUpdated')?.split('"').join('') || ''
)
