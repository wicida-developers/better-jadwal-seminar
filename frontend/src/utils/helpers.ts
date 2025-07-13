export const datetimeFullFormater = (date: string) => {
  return new Date(date).toLocaleDateString('ID', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
}

export const datetimeShortFormater = (date: string) => {
  return new Date(date).toLocaleDateString('ID', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
