import { Inject, Injectable } from '@nestjs/common'
import { UnleashModuleOptions } from '.'
import { Request } from '../unleash-strategies'
import { UNLEASH_MODULE_OPTIONS } from './unleash.constants'

@Injectable()
export class UnleashContext<TCustomData = unknown> {
  #customData?: TCustomData

  constructor(
    @Inject(UNLEASH_MODULE_OPTIONS)
    private readonly options: UnleashModuleOptions,
  ) {}

  getUserId(): string | undefined {
    return undefined
  }

  getRemoteAddress(): string | undefined {
    return undefined
  }

  getSessionId(): string | undefined {
    return undefined
  }

  getRequest<T = Request<{ id: string }>>(): T {
    return {} as T
  }

  get customData(): TCustomData | undefined {
    return this.#customData
  }

  extend(customData: TCustomData | undefined): UnleashContext<TCustomData> {
    this.#customData = customData

    return this
  }
}
