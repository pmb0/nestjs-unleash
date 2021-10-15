import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import axios, { AxiosInstance } from 'axios'
import { ToggleEntity } from '../src/unleash/entity/toggle.entity'
import { ToggleRepository } from '../src/unleash/repository/toggle-repository'
import { ApplicationModule } from './src/app.module'

describe('AppController (e2e)', () => {
  let app: NestExpressApplication
  let http: AxiosInstance

  beforeEach(async () => {
    app = await NestFactory.create<NestExpressApplication>(
      ApplicationModule,
      new ExpressAdapter(),
      { logger: ['debug'], abortOnError: false },
    )

    app.enableShutdownHooks()

    await app.init()

    const toggles = app.get(ToggleRepository)
    toggles.create(
      new ToggleEntity({
        createdAt: new Date().toISOString(),
        description: '',
        enabled: true,
        name: 'test',
        variants: [],
        strategies: [
          {
            name: 'userWithId',
            parameters: { userIds: '1,2' },
          },
        ],
      }),
    )

    await app.listen('3000', '127.0.0.1')

    http = axios.create({ baseURL: await app.getUrl() })
  })

  afterEach(async () => {
    await app.close()
  })

  describe('/ (GET)', () => {
    test('feature is not active', async () => {
      const response = await http.get('/')
      expect(response.data).toMatchInlineSnapshot(`"feature is not active"`)
    })

    test('feature is active', async () => {
      expect(
        (await http.get('/', { headers: { 'x-user-id': '1' } })).data,
      ).toBe('feature is active')

      expect(
        (await http.get('/', { headers: { 'x-user-id': '2' } })).data,
      ).toBe('feature is active')

      expect(
        (await http.get('/', { headers: { 'x-user-id': '3' } })).data,
      ).toBe('feature is not active')
    })
  })

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .set('x-user-id', '122')
  //     .expect(200)
  //     .expect('Hello World!')
  // })
})
