import { normalizedValue, randomGenerator } from './util'

describe('Util', () => {
  test('normalizedValue()', () => {
    expect(normalizedValue('id', 'group')).toBe(9)
    expect(normalizedValue('id', 'group', 1)).toBe(1)
  })

  test('randomGenerator()', () => {
    // https://xkcd.com/221/
    jest.spyOn(global.Math, 'random').mockImplementation(() => 0.55)

    expect(randomGenerator()).toBe(56)
  })
})
