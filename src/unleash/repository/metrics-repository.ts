import { Injectable } from '@nestjs/common'
import { MetricEntity } from '../entity/metric.entity'
import { BaseRepository } from './base-repository'

@Injectable()
export class MetricsRepository extends BaseRepository<MetricEntity> {}
