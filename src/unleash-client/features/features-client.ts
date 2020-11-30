import { Injectable } from '@nestjs/common'
import { UnleashClient } from '../unleash-client'
import { GetFeaturesResponse } from './features-client.interfaces'

@Injectable()
export class UnleashFeaturesClient {
  constructor(private readonly client: UnleashClient) {}

  getFeatures(): Promise<GetFeaturesResponse> {
    return this.client.get('/features')
  }
}
