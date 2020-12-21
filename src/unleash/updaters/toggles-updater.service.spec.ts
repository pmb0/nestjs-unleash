import { HttpStatus } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { Test, TestingModule } from '@nestjs/testing'
import MockDate from 'mockdate'
import { UnleashFeaturesClient } from '../../unleash-client'
import { ToggleRepository } from '../repository/toggle-repository'
import { REFRESH_INTERVAL } from '../unleash.constants'
import { TogglesUpdaterService } from './toggles-updater.service'

MockDate.set('2010-01-01')

describe('TogglesUpdaterService', () => {
  let updater: TogglesUpdaterService
  let toggles: ToggleRepository
  let warnSpy: jest.SpyInstance
  let featureClient: jest.Mocked<UnleashFeaturesClient>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: REFRESH_INTERVAL,
          useValue: 1,
        },
        {
          provide: SchedulerRegistry,
          useClass: class SchedulerRegistryMock {},
        },
        ToggleRepository,
        {
          provide: UnleashFeaturesClient,
          useValue: { getFeatures: jest.fn() },
        },
        TogglesUpdaterService,
      ],
    }).compile()

    updater = module.get(TogglesUpdaterService)
    toggles = module.get(ToggleRepository)
    featureClient = module.get(UnleashFeaturesClient)

    // @ts-ignore
    warnSpy = jest.spyOn(updater.logger, 'warn').mockImplementation()
  })

  describe('update()', () => {
    it('syncs features', async () => {
      featureClient.getFeatures.mockResolvedValue({
        version: 123,
        // @ts-ignore
        features: [{ name: 'toggle1' }, { name: 'toggle2' }],
      })

      await updater.update()

      expect(toggles).toMatchInlineSnapshot(`
        ToggleRepository {
          "items": Array [
            ToggleEntity {
              "id": "toggle1",
              "name": "toggle1",
            },
            ToggleEntity {
              "id": "toggle2",
              "name": "toggle2",
            },
          ],
        }
      `)
    })

    it('logs 404 errors', async () => {
      featureClient.getFeatures.mockRejectedValue({
        message: 'error message',
        isAxiosError: true,
        config: { url: '/foo', baseURL: 'https://example.com' },
        response: { status: HttpStatus.NOT_FOUND },
      })

      await updater.update()

      expect(warnSpy).toHaveBeenCalledWith(
        'Could not retrieve https://example.com/foo: error message',
      )
    })
  })
})
