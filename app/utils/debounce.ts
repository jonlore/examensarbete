export function debounce(fn: Function, delay = 400) {
  let timeout: number
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => fn(...args), delay)
  }
}