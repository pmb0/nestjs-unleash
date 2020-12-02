import { DynamicModule, Module, Type } from '@nestjs/common'
import {
  ApplicationHostnameStrategy,
  DefaultStrategy,
  FlexibleRolloutStrategy,
  GradualRolloutSessionIdStrategy,
  RemoteAddressStrategy,
  UnleashStrategy,
  UserWithIdStrategy,
} from './strategy'
import { GradualRolloutRandomStrategy } from './strategy/gradual-rollout-random'
import { UnleashStrategiesService } from './unleash-strategies.service'
import { UnleashContext } from './unleash.context'

export const CUSTOM_STRATEGIES = 'CUSTOM_STATEGIES'

@Module({})
export class UnleashStrategiesModule {
  static register(strategies: Type<UnleashStrategy>[] = []): DynamicModule {
    return {
      module: UnleashStrategiesModule,
      providers: [
        UnleashContext,
        UnleashStrategiesService,
        DefaultStrategy,
        ApplicationHostnameStrategy,
        FlexibleRolloutStrategy,
        RemoteAddressStrategy,
        UserWithIdStrategy,
        GradualRolloutRandomStrategy,
        GradualRolloutSessionIdStrategy,
        ...strategies,
        { provide: 'CUSTOM_STRATEGIES', useValue: strategies },
      ],
      exports: [UnleashStrategiesService, UnleashContext],
    }
  }
}
