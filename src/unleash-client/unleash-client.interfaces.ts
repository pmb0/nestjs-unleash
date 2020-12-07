import { ModuleMetadata, Type } from '@nestjs/common'

export interface UnleashClientModuleOptions {
  baseURL: string
  instanceId: string
  appName: string
  timeout: number
}

export interface UnleashClientModuleOptionsFactory {
  createStrategiesOptions():
    | Promise<UnleashClientModuleOptions>
    | UnleashClientModuleOptions
}

export interface UnleashClientModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useExisting?: Type<UnleashClientModuleOptionsFactory>
  useClass?: Type<UnleashClientModuleOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashClientModuleOptions> | UnleashClientModuleOptions
}
