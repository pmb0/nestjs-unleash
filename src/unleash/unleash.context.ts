import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { UnleashModuleOptions } from '.'
import { ExpressSession, FastifySession, Request } from '../unleash-strategies'
import { UNLEASH_MODULE_OPTIONS } from './unleash.constants'

const defaultUserIdFactory = (request: Request<{ id: string }>) => {
  return request.user?.id?.toString()
}

@Injectable({ scope: Scope.REQUEST })
export class UnleashContext {
  constructor(
    @Inject(REQUEST) private request: Request<{ id: string }>,
    @Inject(UNLEASH_MODULE_OPTIONS)
    private readonly options: UnleashModuleOptions,
  ) {}

  getUserId(): string | undefined {
    const userIdFactory = this.options.userIdFactory ?? defaultUserIdFactory
    return userIdFactory(this.request)
  }

  getRemoteAddress(): string | undefined {
    return this.request.ip
  }

  getSessionId(): string | undefined {
    return (
      (this.request.session as ExpressSession | undefined)?.id ||
      (this.request.session as FastifySession | undefined)?.sessionId
    )
  }

  getRequest<T = Request<{ id: string }>>(): T {
    return this.request as T
  }
}
