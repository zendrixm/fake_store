export function capitalize(word: string): string {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : ''
}

export function formatRelativeTime(date: Date | string): string {
  const inputDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000)

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value)
    if (count >= 1) {
      return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`
    }
  }

  return 'just now'
}

export function formatFullDate(dateString: string): string {
  if (!dateString) return 'Invalid date'

  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatCurrency(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

export function getInitial(name: string): string {
  return name?.charAt(0).toUpperCase()
}
