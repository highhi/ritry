import { ritry } from '../src'

test('should be run until successful', async () => {
  const mock = jest.fn()
  let count = 1

  const result = await ritry(() => {
    mock()

    return new Promise<string>((resolve, reject) => {
      if (count < 3) {
        reject('fail')
      } else {
        resolve('success')
      }

      count++
    })
  }, { retry: 4 })

  expect(mock).toBeCalledTimes(3)
  expect(result).toBe('success')
})

test('should be throw exception', async () => {
  const mock = jest.fn(() => Promise.reject(new Error('fail')))
  await expect(ritry(mock, { retry: 4 })).rejects.toThrow('fail')
  expect(mock).toBeCalledTimes(5)
})

test('should be run once by default', async () => {
  const mock = jest.fn(() => Promise.reject(new Error('fail')))
  await expect(ritry(mock)).rejects.toThrow('fail')
  expect(mock).toBeCalledTimes(2)
})

test('should be able to get the number of retries', async () => {
  const numbers1: number[] = []
  const numbers2: number[] = []

  try {
    await ritry(({ retryCount }) => {
      numbers1.push(retryCount)
      return Promise.reject(new Error('fail'))
    }, { retry: 4 })
  } catch(_) {
    expect(numbers1).toEqual([0, 1, 2, 3, 4])
  }

  await ritry(({ retryCount }) => {
    return new Promise((resolve, reject) => {
      numbers2.push(retryCount)
      if (retryCount < 3) return reject(new Error('fail'))
      resolve()
    })
  }, { retry: 4 })

  expect(numbers2).toEqual([0, 1, 2, 3])
})
