import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import { UnleashRegisterClient } from '..'
import { version } from '../../../package.json'
import { UnleashClient } from '../unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from '../unleash-client.constants'

const Date = global.Date

// @ts-ignore
global.Date = class extends Date {
  constructor() {
    super()
    return new Date(1466424490000)
  }
}

describe('UnleashClient', () => {
  let client: UnleashRegisterClient
  let requestSpy: jest.SpyInstance

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UnleashRegisterClient,
        // HttpService,
        UnleashClient,
        {
          provide: UNLEASH_CLIENT_OPTIONS,
          useValue: {
            baseUrl: 'https://example.com/',
            instanceId: 'myId',
            appName: 'myApp',
            timeout: 3000,
          },
        },
      ],
    }).compile()

    client = module.get(UnleashRegisterClient)

    requestSpy = jest
      .spyOn(module.get(HttpService), 'request')
      .mockImplementation()
  })

  it('register()', async () => {
    requestSpy.mockReturnValue(of({}))

    await client.register(1234, ['a', 'b'])

    expect(requestSpy).toHaveBeenCalledWith({
      data: {
        appName: 'myApp',
        instanceId: 'myId',
        interval: 1234,
        sdkVersion: `nestjs-unleash@${version}`,
        started: '2016-06-20T12:08:10.000Z',
        strategies: ['a', 'b'],
      },
      method: 'POST',
      url: '/register',
    })
  })
})
