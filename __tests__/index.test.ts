import rirty from '../lib'

test('should be run until successful', async () => {
  const mock = jest.fn()
  let count = 1

  const result = await rirty(() => {
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
  await expect(rirty(mock, { retry: 4 })).rejects.toThrow('fail')
  expect(mock).toBeCalledTimes(4)
})

test('should be run once by default', async () => {
  const mock = jest.fn(() => Promise.reject(new Error('fail')))
  await expect(rirty(mock)).rejects.toThrow('fail')
  expect(mock).toBeCalledTimes(1)
})
