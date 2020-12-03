import { Inject, Injectable, Type } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import {
  ApplicationHostnameStrategy,
  DefaultStrategy,
  FlexibleRolloutStrategy,
  GradualRolloutRandomStrategy,
  GradualRolloutSessionIdStrategy,
  RemoteAddressStrategy,
  UnleashStrategy,
  UserWithIdStrategy,
} from './strategy'
import { GradualRolloutUserIdStrategy } from './strategy/gradual-rollout-user-id'
import { CUSTOM_STRATEGIES } from './unleash-strategies.constants'

@Injectable()
export class UnleashStrategiesService {
  private strategies: UnleashStrategy[]

  constructor(
    private readonly userWithId: UserWithIdStrategy,
    private readonly hostname: ApplicationHostnameStrategy,
    private readonly remoteAddress: RemoteAddressStrategy,
    private readonly defaultStrategy: DefaultStrategy,
    private readonly flexibleRollout: FlexibleRolloutStrategy,
    private readonly gradualRolloutRandom: GradualRolloutRandomStrategy,
    private readonly gradualRolloutUserId: GradualRolloutUserIdStrategy,
    private readonly gradualRolloutSessionId: GradualRolloutSessionIdStrategy,
    @Inject(CUSTOM_STRATEGIES) strategies: Type<UnleashStrategy>[] = [],
    module: ModuleRef,
  ) {
    this.strategies = [
      userWithId,
      hostname,
      remoteAddress,
      defaultStrategy,
      flexibleRollout,
      gradualRolloutRandom,
      gradualRolloutUserId,
      gradualRolloutSessionId,
      ...strategies.map((strategy) => module.get(strategy)),
    ]
  }

  findAll(): UnleashStrategy[] {
    return this.strategies
  }

  find(name: string): UnleashStrategy | undefined {
    return this.strategies.find((strategy) => strategy.name === name)
  }

  add(strategy: UnleashStrategy): void {
    this.strategies.push(strategy)
  }
}
