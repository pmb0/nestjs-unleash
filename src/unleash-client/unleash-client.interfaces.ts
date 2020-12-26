import { ModuleMetadata, Type } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'

export interface UnleashClientModuleOptions {
  baseURL: string
  instanceId: string
  appName: string
  http?: AxiosRequestConfig
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
