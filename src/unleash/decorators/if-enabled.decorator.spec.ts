import { ExecutionContext, NotFoundException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { UnleashService } from '../unleash.service'
import {
  IfEnabled,
  IfEnabledGuard,
  METADATA_TOGGLE_NAME,
} from './if-enabled.decorator'

class MyType {}

describe('@IfEnabled()', () => {
  test('IfEnabled()', () => {
    IfEnabled('myToggleName')(MyType)

    expect(new Reflector().get(METADATA_TOGGLE_NAME, MyType)).toBe(
      'myToggleName',
    )
  })

  describe('IfEnabledGuard', () => {
    let guard: IfEnabledGuard
    let context: ExecutionContext
    let service: jest.Mocked<UnleashService>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          IfEnabledGuard,
          { provide: UnleashService, useValue: { isEnabled: jest.fn() } },
        ],
      }).compile()

      guard = module.get(IfEnabledGuard)
      service = module.get(UnleashService)
      // @ts-ignore
      context = { getHandler: jest.fn().mockReturnValue(MyType) }
    })

    it('throws a NotFoundException', () => {
      expect(() => {
        guard.canActivate(context)
      }).toThrow(NotFoundException)
    })

    it('passes if feature is enabled', () => {
      service.isEnabled.mockReturnValue(true)

      expect(guard.canActivate(context)).toBeTruthy()
    })
  })
})
