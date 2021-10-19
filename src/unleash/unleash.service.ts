import { Injectable, Logger, Scope } from '@nestjs/common'
import { UnleashStrategiesService } from '../unleash-strategies'
import { MetricsService } from './metrics.service'
import { ToggleRepository } from './repository/toggle-repository'
import { UnleashContext } from './unleash.context'

@Injectable({ scope: Scope.REQUEST })
export class UnleashService<TCustomData = unknown> {
  protected readonly logger = new Logger(UnleashService.name)

  constructor(
    private readonly toggles: ToggleRepository,
    private readonly strategies: UnleashStrategiesService,
    private readonly metrics: MetricsService,
    private readonly context: UnleashContext<TCustomData>,
  ) {}

  // eslint-disable-next-line sonarjs/cognitive-complexity
  #isEnabled(
    name: string,
    defaultValue = false,
    customData?: TCustomData,
  ): boolean {
    const toggle = this.toggles.find(name)

    this.context.extend(customData)

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
      } catch (_error) {
        const error: Error =
          _error instanceof Error ? _error : new Error(JSON.stringify(_error))
        this.logger.error(error.message, error.stack)
        return false
      }
    })
  }

  isEnabled(
    name: string,
    defaultValue = false,
    customData?: TCustomData,
  ): boolean {
    const isEnabled = this.#isEnabled(name, defaultValue, customData)
    this.metrics.increase(name, isEnabled)
    return isEnabled
  }
}
