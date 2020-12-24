import { DefaultStrategy } from './default'

describe('DefaultStrategy', () => {
  let strategy: DefaultStrategy

  beforeEach(() => {
    strategy = new DefaultStrategy()
  })

  test('isEnabled()', () => {
    // @ts-ignore
    expect(strategy.isEnabled({}, {})).toBeTruthy()
  })
})
