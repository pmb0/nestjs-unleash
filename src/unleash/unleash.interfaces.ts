import { ModuleMetadata, Provider, Type } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'
import { Request as ExpressRequest } from 'express'
import { Request, UnleashStrategy } from '../unleash-strategies'

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

  /**
   * Additional options for the HTTP request to the Unleash server, e.g. custom
   * HTTP headers
   */
  http?: AxiosRequestConfig

  /**
   * At which interval, in milliseconds, will this client update its feature
   * state
   */
  refreshInterval?: number

  /**
   * At which interval, in milliseconds, will this client send metrics
   */
  metricsInterval?: number

  /**
   * Array of custom strategies. These classes mus implement the `UnleashStrategy` interface.
   */
  strategies?: Type<UnleashStrategy>[]

  /**
   * `nestjs-unleash` sends an initial registration request to the unleash server at startup. This behavior can be disabled by this option.
   */
  disableRegistration?: boolean

  /**
   * Some strategies depend on the user ID of the currently logged in user. The
   * user ID is expected by default in `request.user.id`. To customize this
   * behavior, a custom user ID factory can be provided.
   */
  userIdFactory?: (request: ExpressRequest | Request<{ id: string }>) => string
}

export interface UnleashModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  extraProviders?: Provider[]
  inject?: any[]
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashModuleOptions> | UnleashModuleOptions
}
