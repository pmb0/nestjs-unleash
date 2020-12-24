import { createContext } from '../../testing'
import { ApplicationHostnameStrategy } from './application-hostname'

describe('ApplicationHostnameStrategy', () => {
  let strategy: ApplicationHostnameStrategy

  beforeEach(() => {
    strategy = new ApplicationHostnameStrategy()
  })

  describe('isEnabled()', () => {
    test('no hostnames provided', () => {
      expect(strategy.isEnabled({ hostNames: '' }, createContext())).toBeFalsy()
    })

    test('hostname does not match', () => {
      strategy.hostname = 'foo'
      expect(
        strategy.isEnabled({ hostNames: 'a,b' }, createContext()),
      ).toBeFalsy()
    })

    test('hostname matches', () => {
      strategy.hostname = 'b'
      expect(
        strategy.isEnabled({ hostNames: 'a,b' }, createContext()),
      ).toBeTruthy()
    })

    it('normalizes host names', () => {
      strategy.hostname = 'uppercase'
      expect(
        strategy.isEnabled({ hostNames: 'a,b,UPPERCASE' }, createContext()),
      ).toBeTruthy()
    })
  })
})
