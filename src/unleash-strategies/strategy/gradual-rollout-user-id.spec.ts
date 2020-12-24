import { createContext } from '../../testing'
import { GradualRolloutUserIdStrategy } from './gradual-rollout-user-id'

describe('GradualRolloutUserIdStrategy', () => {
  let strategy: GradualRolloutUserIdStrategy

  beforeEach(() => {
    strategy = new GradualRolloutUserIdStrategy()
  })

  describe('isEnabled()', () => {
    test('userId is missing', () => {
      expect(
        strategy.isEnabled({ groupId: '', percentage: '100' }, createContext()),
      ).toBeFalsy()
    })

    it('is enabled', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', percentage: '100' },
          createContext({ userId: '1' }),
        ),
      ).toBeTruthy()
    })

    it('is not enabled', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', percentage: '1' },
          createContext({ userId: '1' }),
        ),
      ).toBeFalsy()
    })
  })
})
