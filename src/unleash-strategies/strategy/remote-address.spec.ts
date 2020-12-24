import { createContext } from '../../testing'
import { RemoteAddressStrategy } from './remote-address'

describe('RemoteAdressStrategy', () => {
  let strategy: RemoteAddressStrategy

  beforeEach(() => {
    strategy = new RemoteAddressStrategy()
  })

  describe('isEnabled()', () => {
    test('IPs missing', () => {
      expect(strategy.isEnabled({ IPs: '' }, createContext())).toBeFalsy()
    })

    test('remote address missing', () => {
      expect(
        strategy.isEnabled({ IPs: '1.2.3.4' }, createContext()),
      ).toBeFalsy()
    })

    test('ip equals remote address', () => {
      expect(
        strategy.isEnabled(
          { IPs: '1.2.3.4' },
          createContext({ remoteAddress: '1.2.3.4' }),
        ),
      ).toBeTruthy()
    })

    test('CIDR subnet matches', () => {
      expect(
        strategy.isEnabled(
          { IPs: '1.2.3.0/24' },
          createContext({ remoteAddress: '1.2.3.4' }),
        ),
      ).toBeTruthy()
    })

    test('CIDR subnet does not match', () => {
      expect(
        strategy.isEnabled(
          { IPs: '1.2.1.0/24' },
          createContext({ remoteAddress: '1.1.1.1' }),
        ),
      ).toBeFalsy()
    })
  })
})
