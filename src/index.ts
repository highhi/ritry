type Callback<T> = () => Promise<T>
type Options = { retry?: number }

export async function ritry<T>(callback: Callback<T>, options: Options = {}): Promise<T> {
  const mergedOpts = { retry: 1, ...options }

  if (mergedOpts.retry < 1) {
    throw new Error('The number of retries must be at least one')
  }

  let result: T = undefined as any
  let count = 1

  for (; count <= mergedOpts.retry; count++) {
    try {
      result = await callback()
      break
    } catch (err) {
      if (count >= mergedOpts.retry) {
        throw err
      }
    }
  }

  return result
}
