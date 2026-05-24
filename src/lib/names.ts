export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length <= 1) return { first: fullName, last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export function getFirstName(fullName: string): string {
  return splitName(fullName).first
}
