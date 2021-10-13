import { Injectable, Logger, Scope } from '@nestjs/common'
import { UnleashStrategiesService } from '../unleash-strategies'
import { MetricsService } from './metrics.service'
import { ToggleRepository } from './repository/toggle-repository'
import { UnleashContext } from './unleash.context'

@Injectable({ scope: Scope.REQUEST })
export class UnleashService {
  protected readonly logger = new Logger(UnleashService.name)

  constructor(
    private readonly toggles: ToggleRepository,
    private readonly strategies: UnleashStrategiesService,
    private readonly metrics: MetricsService,
    private readonly context: UnleashContext,
  ) {}

  // eslint-disable-next-line sonarjs/cognitive-complexity
  _isEnabled(name: string, defaultValue = false): boolean {
    const toggle = this.toggles.find(name)

    if (!toggle) {
      this.logger.warn(`Toggle not found: ${name}`)
      return defaultValue
    }

    if (toggle.stale) {
      this.logger.warn(`Toggle is stale: ${name}`)
    }

    if (!toggle.enabled) {
      this.logger.log(`Toggle is disabled: ${name}`)
      return defaultValue
    }

    if (toggle.strategies.length === 0) {
      return toggle.enabled
    }

    return toggle.strategies.some((data) => {
      const strategy = this.strategies.find(data.name)

      if (!strategy) {
        return false
      }

      try {
        const isEnabled = strategy.isEnabled(data.parameters, this.context)
        if (isEnabled) {
          this.logger.debug(`Strategy "${data.name}" returned true`)
        }
        return isEnabled
      } catch (error) {
        this.logger.error((error as Error).stack)
        return false
      }
    })
  }

  isEnabled(name: string, defaultValue = false): boolean {
    const isEnabled = this._isEnabled(name, defaultValue)
    this.metrics.increase(name, isEnabled)
    return isEnabled
  }

  get Properties(): Map<string, any> {
    return this.context.Properties;
  }
}
