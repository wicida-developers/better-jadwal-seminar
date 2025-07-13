import { Insertable, Selectable } from 'kysely'

export interface Database {
  seminars: SeminarTable
  cf_KV: KvTable
}

export interface KvTable {
  key: string
  value: string
}

export interface SeminarTable {
  title: string
  seminarType: string
  studentName: string
  major: string
  advisors: string
  examiners: string
  room: string
  datetime: string
}

export type Seminar = Selectable<SeminarTable>
export type SeminarInsert = Insertable<SeminarTable>
