import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import {
  METRICS_INTERVAL,
  REFRESH_INTERVAL,
  UnleashContext,
  UnleashModuleOptions,
} from '.'
import { UnleashClientModule, UnleashRegisterClient } from '../unleash-client'
import {
  UnleashStrategiesModule,
  UnleashStrategiesService,
} from '../unleash-strategies'
import { MetricsService } from './metrics.service'
import { MetricsRepository } from './repository/metrics-repository'
import { ToggleRepository } from './repository/toggle-repository'
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

  onModuleInit(): void {
    void this.togglesUpdater.start()

    void this.registerClient
      .register(
        this.metricsInterval,
        this.strategies.findAll().map((strategy) => strategy.name),
      )
      .then(() => this.metricsUpdater.start())
      .catch((error) => {
        this.logger.error(error)
      })
  }

  static forRoot(options: UnleashModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: UnleashModule,
      imports: [
        UnleashClientModule.register({
          baseURL: options.url,
          appName: options.appName,
          instanceId: options.instanceId,
          timeout: options.timeout || DEFAULT_TIMEOUT,
        }),
        UnleashStrategiesModule.register(options.strategies),
      ],
      providers: [
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
}
