import { Inject, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { METRICS_INTERVAL } from '..'
import { UnleashMetricsClient } from '../../unleash-client'
import { MetricsRepository } from '../repository/metrics-repository'
import { BaseUpdater } from './base-updater'

@Injectable()
export class MetricsUpdaterService extends BaseUpdater {
  lastUpdated = new Date()

  constructor(
    @Inject(METRICS_INTERVAL) protected readonly interval: number,
    protected readonly scheduler: SchedulerRegistry,
    private readonly metrics: MetricsRepository,
    private readonly metricsClient: UnleashMetricsClient,
  ) {
    super()
  }

  async update(): Promise<void> {
    const metrics = this.metrics.findAll()

    if (metrics.length === 0) {
      return
    }

    try {
      await this.metricsClient.sendMetrics({
        bucket: {
          start: this.lastUpdated.toISOString(),
          stop: new Date().toISOString(),
          toggles: Object.fromEntries(
            metrics.map((metric) => [
              metric.id,
              { yes: metric.yes, no: metric.no },
            ]),
          ),
        },
      })

      this.metrics.flushAll()
    } catch (error) {
      this.logger.warn((error as Error).message)
    }
  }
}
