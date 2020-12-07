import { ModuleMetadata, Provider, Type } from '@nestjs/common'
import { UnleashStrategy } from './strategy'

// https://github.com/SerayaEryn/fastify-session/blob/master/types/types.d.ts
export interface FastifySession {
  sessionId: string
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts
export interface ExpressSession {
  id: string
}

export type Request<T> = {
  user?: T
  ip?: string
  session?: FastifySession | ExpressSession
}

export interface Properties {
  [key: string]: string | undefined | number
}

export interface Context {
  [key: string]: string | undefined | number | Properties
  userId?: string
  sessionId?: string
  remoteAddress?: string
  environment?: string
  appName?: string
  properties?: Properties
}

export interface UnleashStrategiesOptionsFactory {
  createStrategiesOptions():
    | Promise<UnleashStrategiesModuleOptions>
    | UnleashStrategiesModuleOptions
}

export interface UnleashStrategiesModuleOptions {
  strategies: Type<UnleashStrategy>[]
}

export interface UnleashStrategiesModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  extraProviders?: Provider[]
  inject?: any[]
  useExisting?: Type<UnleashStrategiesOptionsFactory>
  useClass?: Type<UnleashStrategiesOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashStrategiesModuleOptions> | UnleashStrategiesModuleOptions
}
