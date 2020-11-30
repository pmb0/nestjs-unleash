import { Inject, Injectable } from '@nestjs/common'
import { UnleashClient } from '../unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from '../unleash-client.constants'
import { UnleashClientModuleOptions } from '../unleash-client.interfaces'
import { SendMetricsRequestBody } from './metrics-client.interfaces'

@Injectable()
export class UnleashMetricsClient {
  constructor(
    @Inject(UNLEASH_CLIENT_OPTIONS)
    private readonly clientOptions: UnleashClientModuleOptions,
    private readonly client: UnleashClient,
  ) {}

  async sendMetrics(
    body: Omit<SendMetricsRequestBody, 'appName' | 'instanceId'>,
  ): Promise<void> {
    return this.client.post('/metrics', {
      ...body,
      appName: this.clientOptions.appName,
      instanceId: this.clientOptions.instanceId,
    })
  }
}
