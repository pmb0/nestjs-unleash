import { createContext } from '../../testing'
import { GradualRolloutSessionIdStrategy } from './gradual-rollout-session-id'

describe('GradualRolloutSessionIdStrategy', () => {
  let strategy: GradualRolloutSessionIdStrategy

  beforeEach(() => {
    strategy = new GradualRolloutSessionIdStrategy()
  })

  describe('isEnabled()', () => {
    test('sessionId is missing', () => {
      expect(
        strategy.isEnabled({ groupId: '', percentage: '100' }, createContext()),
      ).toBeFalsy()
    })

    it('is enabled', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', percentage: '100' },
          createContext({ sessionId: '1' }),
        ),
      ).toBeTruthy()
    })

    it('is not enabled', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', percentage: '1' },
          createContext({ sessionId: '1' }),
        ),
      ).toBeFalsy()
    })
  })
})
