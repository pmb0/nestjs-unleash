import { Logger, OnApplicationShutdown } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

export abstract class BaseUpdater implements OnApplicationShutdown {
  private timeout?: NodeJS.Timeout
  protected readonly logger = new Logger(this.constructor.name)
  protected abstract interval: number
  protected abstract scheduler: SchedulerRegistry

  async start(): Promise<void> {
    this.logger.debug(
      `Running ${this.constructor.name} every ${this.interval} ms ...`,
    )
    await this.update()

    this.timeout = setInterval(() => {
      void this.update()
    }, this.interval)

    this.scheduler.addInterval(this.constructor.name, this.timeout)
  }

  stop(): void {
    if (this.timeout) {
      this.logger.debug(`Stopping updater ${this.constructor.name} ...`)
      clearInterval(this.timeout)
    }
  }

  abstract update(): Promise<void>

  onApplicationShutdown(_signal?: string): void {
    this.stop()
  }
}
