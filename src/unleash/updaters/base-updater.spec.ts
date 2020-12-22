import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { Test, TestingModule } from '@nestjs/testing'
import { BaseUpdater } from './base-updater'
import { MetricsUpdaterService } from './metrics-updater.service'

@Injectable()
class MyUpdater extends BaseUpdater {
  protected interval = 14
  update = jest.fn()

  constructor(protected readonly scheduler: SchedulerRegistry) {
    super()
  }
}

describe('BaseUpdater', () => {
  let updater: MetricsUpdaterService
  let debugSpy: jest.SpyInstance

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulerRegistry, MyUpdater],
    }).compile()

    updater = module.get(MyUpdater)

    // @ts-ignore
    debugSpy = jest.spyOn(updater.logger, 'debug').mockImplementation()
  })

  afterEach(() => {
    updater.stop()

    try {
      // @ts-ignore
      updater.scheduler.deleteInterval(MyUpdater.name)
      // eslint-disable-next-line no-empty
    } catch {}
  })

  test('start()', async () => {
    await updater.start()

    expect(debugSpy).toHaveBeenCalledWith('Running MyUpdater every 14 ms ...')

    // @ts-ignore
    expect(updater.timeout).toBeDefined()

    // @ts-ignore
    expect(updater.scheduler.getInterval(MyUpdater.name)).toBeDefined()
  })

  test('stop()', async () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    await updater.start()

    debugSpy.mockClear()
    updater.stop()

    expect(debugSpy).toHaveBeenCalledWith('Stopping updater MyUpdater ...')
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  test('onApplicationShutDown()', () => {
    const stopSpy = jest.spyOn(updater, 'stop')

    updater.onApplicationShutdown()
    expect(stopSpy).toHaveBeenCalled()
  })
})
