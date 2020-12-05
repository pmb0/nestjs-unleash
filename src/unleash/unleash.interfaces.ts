import { Type } from '@nestjs/common'
import { UnleashStrategy } from '../unleash-strategies'

export interface UnleashModuleOptions {
  /**
   * If "true", registers `UnleashModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   *
   * @default true
   */
  global?: boolean

  /**
   * URL of your Unleash server
   *
   * @example http://unleash.herokuapp.com/api/client
   */
  url: string

  /**
   * Name of the application seen by unleash-server
   */
  appName: string

  /**
   * Instance id for this application (typically hostname, podId or similar)
   */
  instanceId: string

  timeout?: number

  /**
   * At which interval, in milliseconds, will this client update its feature
   * state */
  refreshInterval?: number

  /**
   * At which interval, in milliseconds, will this client send metrics
   */
  metricsInterval?: number

  /**
   * Array of custom strategies. These classes mus implement the `UnleashStrategy` interface.
   */
  strategies?: Type<UnleashStrategy>[]
}
