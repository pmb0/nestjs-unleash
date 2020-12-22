import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UnleashRegisterClient } from '..'
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
  let registerClient: UnleashRegisterClient
  let client: jest.Mocked<UnleashClient>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UnleashRegisterClient,
        { provide: UnleashClient, useValue: { post: jest.fn() } },
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

    registerClient = module.get(UnleashRegisterClient)
    client = module.get(UnleashClient)
  })

  it('register()', async () => {
    await registerClient.register(1234, ['a', 'b'])

    expect(client.post).toHaveBeenCalledWith('/register', {
      appName: 'myApp',
      instanceId: 'myId',
      interval: 1234,
      sdkVersion: 'nestjs-unleash@1.1.1',
      started: '2016-06-20T12:08:10.000Z',
      strategies: ['a', 'b'],
    })
  })
})
