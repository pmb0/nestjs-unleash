import { Test, TestingModule } from '@nestjs/testing'
import { UnleashStrategiesService, UnleashStrategy } from '.'
import { UnleashContext } from '..'
import { DefaultStrategy } from './strategy'
import { CUSTOM_STRATEGIES } from './unleash-strategies.constants'
import { UnleashStrategiesModule } from './unleash-strategies.module'

class AlwaysOnStrategy implements UnleashStrategy {
  name = 'alwaysOn'

  isEnabled(_parameters: unknown, _context: UnleashContext): boolean {
    return true
  }
}

class SomeStrategy extends AlwaysOnStrategy {
  name = 'someStrategy'
}

describe('UnleashService', () => {
  let strategies: UnleashStrategiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UnleashStrategiesModule.register({ strategies: [] })],
    })
      .overrideProvider(CUSTOM_STRATEGIES)
      .useValue({ strategies: [AlwaysOnStrategy] })
      .compile()

    strategies = module.get(UnleashStrategiesService)
  })

  describe('onModuleInit()', () => {
    it('appends custom strategies', async () => {
      await strategies.onModuleInit()

      expect(strategies.find('alwaysOn')).toBeInstanceOf(AlwaysOnStrategy)
    })
  })

  test('find()', () => {
    expect(strategies.find('does not exist')).toBeUndefined()
    expect(strategies.find('default')).toBeInstanceOf(DefaultStrategy)
  })

  test('findAll()', () => {
    expect(strategies.findAll()).toHaveLength(8)
  })

  test('add()', () => {
    strategies.add(new SomeStrategy())

    expect(strategies.find('someStrategy')).toBeInstanceOf(SomeStrategy)
  })
})
