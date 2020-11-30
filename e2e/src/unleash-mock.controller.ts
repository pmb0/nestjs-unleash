import { Controller, Get, Logger } from '@nestjs/common'
import { GetFeaturesResponse } from '../../src'

@Controller('/unleash')
export class UnleashMockController {
  protected readonly logger = new Logger(UnleashMockController.name)

  @Get('/features')
  getFeatures(): GetFeaturesResponse {
    this.logger.log('Requested')
    return {
      version: 1,
      features: [
        {
          name: 'test',
          description: 'test',
          enabled: true,
          strategies: [
            {
              name: 'hostname',
              parameters: {
                hostNames: 'example.com',
              },
            },
            {
              name: 'remoteAddress',
              parameters: {
                IPs: '::1,127.0.0.1,127.0.0.0/24',
              },
            },
            {
              name: 'userWithId',
              parameters: {
                userIds: '1',
              },
            },
            {
              name: 'applicationHostname',
              parameters: {
                hostNames: 'asfdafsd',
              },
            },
            {
              name: 'flexibleRollout',
              parameters: {
                rollout: '66',
                stickiness: 'sessionId',
                groupId: 'test',
              },
            },
            {
              name: 'gradualRolloutRandom',
              parameters: {
                percentage: '30',
              },
            },
            {
              name: 'gradualRolloutSessionId',
              parameters: {
                percentage: 50,
                groupId: '',
              },
            },
          ],
          variants: null,
          createdAt: '2018-05-04T19:12:09.873Z',
        },
      ],
    }
  }
}
