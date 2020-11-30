import { Inject, Injectable } from '@nestjs/common'
import { name, version } from '../../../package.json'
import { UnleashClient } from '../unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from '../unleash-client.constants'
import { UnleashClientModuleOptions } from '../unleash-client.interfaces'
import {
  UnleashRegisterClientReponsePayload,
  UnleashRegisterClientRequestPayload,
} from './register-client.interfaces'

@Injectable()
export class UnleashRegisterClient {
  constructor(
    @Inject(UNLEASH_CLIENT_OPTIONS)
    private readonly clientOptions: UnleashClientModuleOptions,
    private readonly client: UnleashClient,
  ) {}

  async register(metricsInterval: number, strategies: string[]): Promise<void> {
    await this.client.post<
      UnleashRegisterClientReponsePayload,
      UnleashRegisterClientRequestPayload
    >('/register', {
      appName: this.clientOptions.appName,
      instanceId: this.clientOptions.instanceId,
      interval: metricsInterval,
      sdkVersion: `${name}@${version}`,
      started: new Date().toISOString(),
      strategies,
    })
  }
}
