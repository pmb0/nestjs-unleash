import { Test, TestingModule } from '@nestjs/testing'
import MockDate from 'mockdate'
import { MetricsService } from './metrics.service'
import { MetricsRepository } from './repository/metrics-repository'

MockDate.set('2010-01-01')

describe('MetricsService', () => {
  let metrics: MetricsService
  let repository: MetricsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsRepository, MetricsService],
    }).compile()

    metrics = module.get(MetricsService)
    repository = module.get(MetricsRepository)
  })

  describe('increase()', () => {
    test('existing metric', () => {
      repository.create({ id: 'foo', yes: 0, no: 0, createdAt: new Date() })

      metrics.increase('foo', false)
      metrics.increase('foo', true)
      metrics.increase('foo', false)

      expect(repository.find('foo')).toMatchInlineSnapshot(`
        Object {
          "createdAt": 2010-01-01T00:00:00.000Z,
          "id": "foo",
          "no": 2,
          "yes": 1,
        }
      `)
    })

    test('new metric (enabled)', () => {
      metrics.increase('new', true)

      expect(repository.find('new')).toMatchInlineSnapshot(`
        MetricEntity {
          "createdAt": 2010-01-01T00:00:00.000Z,
          "id": "new",
          "no": 0,
          "yes": 1,
        }
      `)
    })

    test('new metric (not enabled)', () => {
      metrics.increase('new', false)

      expect(repository.find('new')).toMatchInlineSnapshot(`
        MetricEntity {
          "createdAt": 2010-01-01T00:00:00.000Z,
          "id": "new",
          "no": 1,
          "yes": 0,
        }
      `)
    })
  })
})
