import { SchedulerRegistry } from '@nestjs/schedule'
import { Test, TestingModule } from '@nestjs/testing'
import MockDate from 'mockdate'
import { UnleashMetricsClient } from '../../unleash-client'
import { MetricsRepository } from '../repository/metrics-repository'
import { METRICS_INTERVAL } from '../unleash.constants'
import { MetricsUpdaterService } from './metrics-updater.service'

MockDate.set('2010-01-01')

describe('MetricsUpdaterService', () => {
  let updater: MetricsUpdaterService
  let metricsClient: jest.Mocked<UnleashMetricsClient>
  let metrics: MetricsRepository
  let warnSpy: jest.SpyInstance

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: METRICS_INTERVAL,
          useValue: 1,
        },
        {
          provide: SchedulerRegistry,
          useClass: class SchedulerRegistryMock {},
        },
        MetricsRepository,
        {
          provide: UnleashMetricsClient,
          useValue: { sendMetrics: jest.fn() },
        },
        MetricsUpdaterService,
      ],
    }).compile()

    updater = module.get(MetricsUpdaterService)
    metricsClient = module.get(UnleashMetricsClient)
    metrics = module.get(MetricsRepository)

    // @ts-ignore
    warnSpy = jest.spyOn(updater.logger, 'warn').mockImplementation()
  })

  describe('update()', () => {
    beforeEach(() => {
      metrics.create({
        id: 'myid',
        yes: 10,
        no: 5,
        createdAt: new Date(),
      })
    })

    it('does nothing if there are no metrics', async () => {
      metrics.flushAll()

      await updater.update()

      expect(metricsClient.sendMetrics).not.toHaveBeenCalled()
    })

    it('sends metrics', async () => {
      await updater.update()

      expect(metricsClient.sendMetrics).toHaveBeenCalledWith({
        bucket: {
          start: '2010-01-01T00:00:00.000Z',
          stop: '2010-01-01T00:00:00.000Z',
          toggles: { myid: { no: 5, yes: 10 } },
        },
      })
    })

    it('flushes the metrics repository', async () => {
      await updater.update()

      expect(metrics.findAll()).toEqual([])
    })

    it('logs errors', async () => {
      metricsClient.sendMetrics.mockImplementation(() => {
        throw new Error('ohoh')
      })

      await updater.update()

      expect(warnSpy).toHaveBeenCalledWith('ohoh')
    })
  })
})
