export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  }
  catch (error: any) {
    console.log(error.message)
    return false
  }
}