import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import {
  UnleashContext,
  UnleashModuleAsyncOptions,
  UnleashModuleOptions,
} from '.'
import { UnleashClientModule, UnleashRegisterClient } from '../unleash-client'
import {
  UnleashStrategiesModule,
  UnleashStrategiesModuleOptions,
  UnleashStrategiesService,
} from '../unleash-strategies'
import { MetricsService } from './metrics.service'
import { MetricsRepository } from './repository/metrics-repository'
import { ToggleRepository } from './repository/toggle-repository'
import {
  METRICS_INTERVAL,
  REFRESH_INTERVAL,
  UNLEASH_MODULE_OPTIONS,
} from './unleash.constants'
import { UnleashService } from './unleash.service'
import { MetricsUpdaterService } from './updaters/metrics-updater.service'
import { TogglesUpdaterService } from './updaters/toggles-updater.service'

const DEFAULT_TIMEOUT = 1000
const DEFAULT_INTERVAL = 15000

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    MetricsRepository,
    MetricsService,
    MetricsUpdaterService,
    ToggleRepository,
    TogglesUpdaterService,
    UnleashContext,
    UnleashService,
  ],
  exports: [UnleashService, UnleashStrategiesModule],
})
export class UnleashModule implements OnModuleInit {
  private readonly logger = new Logger(UnleashModule.name)

  constructor(
    private readonly togglesUpdater: TogglesUpdaterService,
    private readonly metricsUpdater: MetricsUpdaterService,
    private readonly registerClient: UnleashRegisterClient,
    @Inject(METRICS_INTERVAL) private readonly metricsInterval: number,
    private readonly strategies: UnleashStrategiesService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.togglesUpdater.start()

    try {
      await this.registerClient.register(
        this.metricsInterval,
        this.strategies.findAll().map((strategy) => strategy.name),
      )
      await this.metricsUpdater.start()
    } catch (error) {
      this.logger.error(error)
    }
  }

  // eslint-disable-next-line complexity
  static forRoot(options: UnleashModuleOptions): DynamicModule {
    const strategiesModule = UnleashStrategiesModule.registerAsync({
      useFactory: (
        options: UnleashModuleOptions,
      ): UnleashStrategiesModuleOptions => ({
        strategies: options.strategies ?? [],
      }),
      inject: [UNLEASH_MODULE_OPTIONS],
    })
    const clientModule = UnleashClientModule.registerAsync({
      useFactory: (options: UnleashModuleOptions) => ({
        baseURL: options.url,
        appName: options.appName,
        instanceId: options.instanceId,
        timeout: options.timeout || DEFAULT_TIMEOUT,
      }),
      inject: [UNLEASH_MODULE_OPTIONS],
    })
    return {
      global: options?.global ?? true,
      module: UnleashModule,
      imports: [strategiesModule, clientModule],
      exports: [clientModule, strategiesModule, UNLEASH_MODULE_OPTIONS],
      providers: [
        {
          provide: UNLEASH_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: REFRESH_INTERVAL,
          useValue: options.refreshInterval ?? DEFAULT_INTERVAL,
        },
        {
          provide: METRICS_INTERVAL,
          useValue: options.metricsInterval ?? DEFAULT_INTERVAL,
        },
      ],
    }
  }

  // eslint-disable-next-line complexity
  static forRootAsync(options: UnleashModuleAsyncOptions): DynamicModule {
    const strategiesModule = UnleashStrategiesModule.registerAsync({
      // extraProviders: options.strategies,
      useFactory: (
        options: UnleashModuleOptions,
      ): UnleashStrategiesModuleOptions => ({
        strategies: options.strategies ?? [],
      }),
      inject: [UNLEASH_MODULE_OPTIONS, ModuleRef],
    })
    const clientModule = UnleashClientModule.registerAsync({
      useFactory: (options: UnleashModuleOptions) => ({
        baseURL: options.url,
        appName: options.appName,
        instanceId: options.instanceId,
        timeout: options.timeout || DEFAULT_TIMEOUT,
      }),
      inject: [UNLEASH_MODULE_OPTIONS],
    })
    return {
      global: options?.global ?? true,
      module: UnleashModule,
      imports: [strategiesModule, clientModule],
      exports: [clientModule, strategiesModule, UNLEASH_MODULE_OPTIONS],
      providers: [
        {
          provide: UNLEASH_MODULE_OPTIONS,
          useFactory: options.useFactory!,
          inject: options.inject,
        },
        {
          provide: REFRESH_INTERVAL,
          useFactory: (options: UnleashModuleOptions) =>
            options.refreshInterval ?? DEFAULT_INTERVAL,
          inject: [UNLEASH_MODULE_OPTIONS],
        },
        {
          provide: METRICS_INTERVAL,
          useFactory: (options: UnleashModuleOptions) =>
            options.metricsInterval ?? DEFAULT_INTERVAL,
          inject: [UNLEASH_MODULE_OPTIONS],
        },
      ],
    }
  }
}
