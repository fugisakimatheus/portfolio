/** First N characters of a title for image fallbacks (e.g. "My App" → "MY"). */
export function getTitleInitials(title: string, length = 2): string {
  return title.slice(0, length).toUpperCase()
}
