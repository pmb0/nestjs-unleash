import { DynamicModule, HttpModule, Module } from '@nestjs/common'
import {
  UnleashFeaturesClient,
  UnleashMetricsClient,
  UnleashRegisterClient,
} from '.'
import { UnleashStrategiesModule } from '..'
import { UnleashClient } from './unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from './unleash-client.constants'
import { UnleashClientModuleOptions } from './unleash-client.interfaces'

@Module({})
export class UnleashClientModule {
  static register(options: UnleashClientModuleOptions): DynamicModule {
    return {
      module: UnleashClientModule,
      imports: [
        HttpModule.register({
          baseURL: options.baseURL,
          headers: {
            'UNLEASH-INSTANCEID': options.instanceId,
            'UNLEASH-APPNAME': options.appName,
          },
          timeout: options.timeout,
        }),
        UnleashStrategiesModule,
      ],
      providers: [
        { provide: UNLEASH_CLIENT_OPTIONS, useValue: options },
        UnleashClient,
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
      exports: [
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
    }
  }
}
