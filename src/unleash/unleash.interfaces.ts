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

  url: string
  appName: string
  instanceId: string
  timeout?: number
  refreshInterval?: number
  metricsInterval?: number

  strategies?: Type<UnleashStrategy>[]
}
