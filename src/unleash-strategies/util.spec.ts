import { mockRandom } from '../testing'
import { normalizedValue, randomGenerator } from './util'

describe('Util', () => {
  test('normalizedValue()', () => {
    expect(normalizedValue('id', 'group')).toBe(9)
    expect(normalizedValue('id', 'group', 1)).toBe(1)
  })

  test('randomGenerator()', () => {
    mockRandom(0.55)
    expect(randomGenerator()).toBe(56)
  })
})
