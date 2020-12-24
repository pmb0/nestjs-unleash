import { createContext, mockRandom } from '../../testing'
import { GradualRolloutRandomStrategy } from './gradual-rollout-random'

describe('GradualRolloutRandomStrategy', () => {
  let strategy: GradualRolloutRandomStrategy

  beforeEach(() => {
    strategy = new GradualRolloutRandomStrategy()
  })

  describe('isEnabled()', () => {
    it('is enabled', () => {
      mockRandom(0.01)
      expect(
        strategy.isEnabled({ percentage: '10' }, createContext()),
      ).toBeTruthy()
    })

    it('is not enabled', () => {
      mockRandom(0.1)
      expect(
        strategy.isEnabled({ percentage: '10' }, createContext()),
      ).toBeFalsy()
    })
  })
})
