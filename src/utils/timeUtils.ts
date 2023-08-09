export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

export const formatDate = (date: Date) => {
  const newDate = new Date(date)

  return `${newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${newDate.getFullYear()}`
}
