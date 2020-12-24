import { createContext, mockRandom } from '../../testing'
import { FlexibleRolloutStrategy, UnleashStickiness } from './flexible-rollout'

describe('FlexibleRolloutStrategy', () => {
  let strategy: FlexibleRolloutStrategy

  beforeEach(() => {
    strategy = new FlexibleRolloutStrategy()
  })

  describe('isEnabled()', () => {
    test('stickinessId does not exist', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', rollout: '0', stickiness: UnleashStickiness.userId },
          createContext(),
        ),
      ).toBeFalsy()
    })

    test('UserID stickiness', () => {
      expect(
        strategy.isEnabled(
          { groupId: '', rollout: '100', stickiness: UnleashStickiness.userId },
          createContext({ userId: '123' }),
        ),
      ).toBeTruthy()
    })

    test('SessinID stickiness', () => {
      expect(
        strategy.isEnabled(
          {
            groupId: '',
            rollout: '100',
            stickiness: UnleashStickiness.sessionId,
          },
          createContext({ sessionId: '123' }),
        ),
      ).toBeTruthy()
    })

    test('random stickiness', () => {
      mockRandom(0.5)
      expect(
        strategy.isEnabled(
          {
            groupId: '',
            rollout: '10',
            stickiness: UnleashStickiness.random,
          },
          createContext({ sessionId: '123' }),
        ),
      ).toBeTruthy()
    })

    test('default stickiness', () => {
      mockRandom(0.5)
      expect(
        strategy.isEnabled(
          {
            groupId: 'fasd',
            rollout: '100',
            stickiness: UnleashStickiness.default,
          },
          createContext(),
        ),
      ).toBeTruthy()
    })
  })
})
