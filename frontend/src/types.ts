export type Seminar = {
  studentName: string
  title: string
  seminarType: string
  major: 'TI' | 'SI' | 'BD'
  advisors: string[]
  examiners: string[]
  room: string
  datetime: string
}
