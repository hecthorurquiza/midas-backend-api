export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(' ')
}