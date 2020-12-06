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
import { GradualRolloutUserIdStrategy } from './strategy/gradual-rollout-user-id'
import { CUSTOM_STRATEGIES } from './unleash-strategies.constants'
import { UnleashStrategiesService } from './unleash-strategies.service'

@Module({})
export class UnleashStrategiesModule {
  static register(strategies: Type<UnleashStrategy>[] = []): DynamicModule {
    return {
      module: UnleashStrategiesModule,
      providers: [
        UnleashStrategiesService,
        DefaultStrategy,
        ApplicationHostnameStrategy,
        FlexibleRolloutStrategy,
        RemoteAddressStrategy,
        UserWithIdStrategy,
        GradualRolloutRandomStrategy,
        GradualRolloutSessionIdStrategy,
        GradualRolloutUserIdStrategy,
        ...strategies,
        { provide: CUSTOM_STRATEGIES, useValue: strategies },
      ],
      exports: [UnleashStrategiesService],
    }
  }
}
