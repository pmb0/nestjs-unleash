import { DynamicModule, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import {
  METRICS_INTERVAL,
  REFRESH_INTERVAL,
  UnleashContext,
  UnleashModuleOptions,
} from '.'
import { UnleashClientModule, UnleashStrategiesModule } from '..'
import { MetricsService } from './metrics.service'
import { MetricsRepository } from './repository/metrics-repository'
import { ToggleRepository } from './repository/toggle-repository'
import { UnleashService } from './unleash.service'
import { MetricsUpdaterService } from './updaters/metrics-updater.service'
import { TogglesUpdaterService } from './updaters/toggles-updater.service'

const DEFAULT_TIMEOUT = 1000
const DEFAULT_INTERVAL = 15000

@Module({})
export class UnleashModule {
  static forRoot(options: UnleashModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: UnleashModule,
      imports: [
        ScheduleModule.forRoot(),
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
        MetricsRepository,
        MetricsService,
        MetricsUpdaterService,
        ToggleRepository,
        TogglesUpdaterService,
        UnleashContext,
        UnleashService,
      ],
      exports: [UnleashService, UnleashStrategiesModule],
    }
  }
}
