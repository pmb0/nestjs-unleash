import { DynamicModule, HttpModule, Module, Provider } from '@nestjs/common'
import {
  UnleashFeaturesClient,
  UnleashMetricsClient,
  UnleashRegisterClient,
} from '.'
import { UnleashStrategiesModule } from '..'
import { UnleashClient } from './unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from './unleash-client.constants'
import {
  UnleashClientModuleAsyncOptions,
  UnleashClientModuleOptions,
} from './unleash-client.interfaces'

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
      providers: [{ provide: UNLEASH_CLIENT_OPTIONS, useValue: options }],
    }
  }

  public static registerAsync(
    options: UnleashClientModuleAsyncOptions,
  ): DynamicModule {
    const provider: Provider = {
      provide: UNLEASH_CLIENT_OPTIONS,
      useFactory: options.useFactory!,
      inject: options.inject,
    }
    return {
      module: UnleashStrategiesModule,
      imports: [
        ...(options.imports ?? []),
        HttpModule.registerAsync({
          useFactory: (options: UnleashClientModuleOptions) => ({
            baseURL: options.baseURL,
            headers: {
              'UNLEASH-INSTANCEID': options.instanceId,
              'UNLEASH-APPNAME': options.appName,
            },
            timeout: options.timeout,
          }),
          inject: [UNLEASH_CLIENT_OPTIONS],
        }),
      ],
      providers: [
        provider,
        UnleashStrategiesModule,
        UnleashClient,
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
      exports: [
        provider,
        UnleashClient,
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
    }
  }
}
