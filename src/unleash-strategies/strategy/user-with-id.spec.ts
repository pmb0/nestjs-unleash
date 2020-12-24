import { createContext } from '../../testing'
import { UserWithIdStrategy } from './user-with-id'

describe('UserWithidStrategy', () => {
  let strategy: UserWithIdStrategy

  beforeEach(() => {
    strategy = new UserWithIdStrategy()
  })

  describe('isEnabled()', () => {
    test('userId does not exist', () => {
      expect(strategy.isEnabled({ userIds: '' }, createContext())).toBeFalsy()
    })

    test('userId matches', () => {
      expect(
        strategy.isEnabled(
          { userIds: '1,2,3' },
          createContext({ userId: '2' }),
        ),
      ).toBeTruthy()
    })

    test('userId does not match', () => {
      expect(
        strategy.isEnabled(
          { userIds: '1,2,3' },
          createContext({ userId: '9' }),
        ),
      ).toBeFalsy()
    })
  })
})
