import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { UnleashStrategiesModuleOptions } from '.'
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
export class UnleashStrategiesService implements OnModuleInit {
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
    @Inject(CUSTOM_STRATEGIES)
    private readonly options: UnleashStrategiesModuleOptions,
    private readonly moduleRef: ModuleRef,
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
    ]
  }

  async onModuleInit(): Promise<void> {
    for (const customStrategy of this.options.strategies) {
      this.strategies.push(await this.moduleRef.create(customStrategy))
    }
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
