import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosError } from 'axios'
import { UnleashClient } from './unleash-client'

describe('UnleashClient', () => {
  let client: UnleashClient

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: 'https://trac02.heise.de/api/v4/feature_flags/unleash/903',
          headers: {
            'UNLEASH-INSTANCEID': 'FIXME',
          },
        }),
      ],
      providers: [UnleashClient],
    }).compile()

    client = module.get(UnleashClient)
  })

  it('features()', async () => {
    expect(await client.getFeatures()).toMatchSnapshot()
  })

  it('sendMetrics()', async () => {
    try {
      await client.sendMetrics()
    } catch (error) {
      console.log(error)
    }
  })

  it.only('register()', async () => {
    try {
      await client.register()
    } catch (error) {
      console.log((error as AxiosError).code, error)
      // console.log(error)
    }
  })
})
