import { Test, TestingModule } from '@nestjs/testing'
import { UnleashClient } from '../unleash-client'
import { UnleashFeaturesClient } from './features-client'

describe('UnleashFeaturesClient', () => {
  let featuresClient: UnleashFeaturesClient
  let unleashClient: jest.Mocked<UnleashClient>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnleashFeaturesClient,
        {
          provide: UnleashClient,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile()

    featuresClient = module.get(UnleashFeaturesClient)
    unleashClient = module.get(UnleashClient)
  })

  test('sendMetrics()', async () => {
    await featuresClient.getFeatures()

    expect(unleashClient.get).toHaveBeenCalledWith('/features')
  })
})
