import { Injectable } from '@nestjs/common'
import { MetricEntity } from './entity/metric.entity'
import { MetricsRepository } from './repository/metrics-repository'

@Injectable()
export class MetricsService {
  constructor(private readonly metrics: MetricsRepository) {}

  private createMetric(id: string, isEnabled: boolean): void {
    if (isEnabled) {
      this.metrics.create(new MetricEntity({ id, yes: 1 }))
    } else {
      this.metrics.create(new MetricEntity({ id, no: 1 }))
    }
  }

  private updateMetric(metric: MetricEntity, isEnabled: boolean): void {
    if (isEnabled) {
      metric.yes++
    } else {
      metric.no++
    }
  }

  increase(id: string, isEnabled: boolean): void {
    const metric = this.metrics.find(id)

    if (metric) {
      this.updateMetric(metric, isEnabled)
    } else {
      this.createMetric(id, isEnabled)
    }
  }
}
