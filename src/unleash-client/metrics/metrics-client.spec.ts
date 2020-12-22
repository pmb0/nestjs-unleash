import { Test, TestingModule } from '@nestjs/testing'
import { UnleashClient } from '../unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from '../unleash-client.constants'
import { UnleashMetricsClient } from './metrics-client'

describe('UnleashMetricsClient', () => {
  let metricsClient: UnleashMetricsClient
  let unleashClient: jest.Mocked<UnleashClient>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnleashMetricsClient,
        {
          provide: UnleashClient,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: UNLEASH_CLIENT_OPTIONS,
          useValue: {
            appName: 'my app',
            instanceId: 'my instance',
          },
        },
      ],
    }).compile()

    metricsClient = module.get(UnleashMetricsClient)
    unleashClient = module.get(UnleashClient)
  })

  test('sendMetrics()', async () => {
    await metricsClient.sendMetrics({
      bucket: { start: '', stop: '', toggles: {} },
    })

    expect(unleashClient.post).toHaveBeenCalledWith('/metrics', {
      appName: 'my app',
      bucket: { start: '', stop: '', toggles: {} },
      instanceId: 'my instance',
    })
  })
})
