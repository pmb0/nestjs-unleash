/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Test, TestingModule } from '@nestjs/testing'
import s1 from '@unleash/client-specification/specifications/01-simple-examples.json'
import s2 from '@unleash/client-specification/specifications/02-user-with-id-strategy.json'
import s3 from '@unleash/client-specification/specifications/03-gradual-rollout-user-id-strategy.json'
import s4 from '@unleash/client-specification/specifications/04-gradual-rollout-session-id-strategy.json'
import s5 from '@unleash/client-specification/specifications/05-gradual-rollout-random-strategy.json'
import s6 from '@unleash/client-specification/specifications/06-remote-address-strategy.json'
import s7 from '@unleash/client-specification/specifications/07-multiple-strategies.json'
import s8 from '@unleash/client-specification/specifications/08-variants.json'
import s10 from '@unleash/client-specification/specifications/10-flexible-rollout-strategy.json'
import {
  ApplicationHostnameStrategy,
  DefaultStrategy,
  FlexibleRolloutStrategy,
  GradualRolloutRandomStrategy,
  GradualRolloutSessionIdStrategy,
  RemoteAddressStrategy,
  UnleashStrategiesService,
  UserWithIdStrategy,
} from '../src'
import { GradualRolloutUserIdStrategy } from '../src/unleash-strategies/strategy/gradual-rollout-user-id'
import { CUSTOM_STRATEGIES } from '../src/unleash-strategies/unleash-strategies.constants'
import { ToggleEntity } from '../src/unleash/entity/toggle.entity'
import { MetricsService } from '../src/unleash/metrics.service'
import { ToggleRepository } from '../src/unleash/repository/toggle-repository'
import { UnleashContext } from '../src/unleash/unleash.context'
import { UnleashService } from '../src/unleash/unleash.service'

jest.mock('../src/unleash/unleash.context')

// 09-strategy-constraints.json is an enterprise feature. can't test.
const testSuite = [s1, s2, s3, s4, s5, s6, s7, s10]

// TODO: Variant support
s8

describe('Specification test', () => {
  let requestContext: jest.Mocked<UnleashContext>
  let toggles: ToggleRepository
  let service: UnleashService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToggleRepository,
        UnleashStrategiesService,
        UnleashService,
        { provide: CUSTOM_STRATEGIES, useValue: [] },
        { provide: MetricsService, useValue: { increase: jest.fn() } },
        UnleashContext,
        ApplicationHostnameStrategy,
        DefaultStrategy,
        FlexibleRolloutStrategy,
        GradualRolloutRandomStrategy,
        GradualRolloutUserIdStrategy,
        RemoteAddressStrategy,
        UserWithIdStrategy,
        GradualRolloutSessionIdStrategy,
      ],
    }).compile()

    requestContext = module.get(UnleashContext)
    toggles = module.get(ToggleRepository)
    service = await module.resolve(UnleashService)
  })

  describe.each(
    testSuite.map((suite) => ({ ...suite, toString: () => suite.name })),
  )('%s', (specification) => {
    beforeEach(() => {
      specification.state.features.forEach((feature) => {
        toggles.create(
          // @ts-ignore
          new ToggleEntity(feature),
        )
      })
    })

    test.each(
      // @ts-ignore
      specification.tests.map((test) => ({
        ...test,
        toString: () => test.description,
      })),
      // @ts-ignore
    )('%s', ({ context, expectedResult, toggleName }) => {
      // @ts-ignore
      requestContext.getRemoteAddress.mockReturnValue(context.remoteAddress)
      // @ts-ignore
      requestContext.getSessionId.mockReturnValue(context.sessionId)
      // @ts-ignore
      requestContext.getUserId.mockReturnValue(context.userId)

      expect(service.isEnabled(toggleName)).toBe(expectedResult)
    })
  })
})
