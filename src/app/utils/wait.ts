export async function waiting(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
} 

type WaitParams = {
  unit?: "ms" | "s" | "m" | "h"
  n: number
  action?: "resolve" | "reject"
  signal?: AbortSignal
} | number

export async function wait(params: WaitParams) {
  if (typeof params === "number") {
    return waiting(params)
  }

  const { unit, n, action, signal } = params

  if (signal?.aborted) return

  const time = (!unit || unit === "ms") ? n :
    unit === "s" ? n * 1000 :
    unit === "m" ? n * 1000 * 60 :
    unit === "h" ? n * 1000 * 60 * 60 : n;

  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      if (action === "reject") reject()
      else resolve(null)
    }, time);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(id)
        reject()
      })
    }
  })
}
