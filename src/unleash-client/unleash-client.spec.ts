import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import { UnleashClient } from './unleash-client'

describe('UnleashClient', () => {
  let client: UnleashClient
  let requestSpy: jest.SpyInstance

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: 'https://example.com/',
          headers: {
            'UNLEASH-INSTANCEID': 'MY-INSTANCE-ID',
          },
        }),
      ],
      providers: [UnleashClient],
    }).compile()

    client = module.get(UnleashClient)

    requestSpy = jest
      .spyOn(module.get(HttpService), 'request')
      .mockImplementation()
  })

  it('request()', async () => {
    requestSpy.mockReturnValue(of({ data: { a: 'b' } }))

    expect(await client.request({ method: 'GET', url: '/foo' })).toEqual({
      a: 'b',
    })
    expect(requestSpy).toHaveBeenCalledWith({ method: 'GET', url: '/foo' })
  })
})
