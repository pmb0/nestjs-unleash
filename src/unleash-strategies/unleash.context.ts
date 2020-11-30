import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { ExpressSession, FastifySession, Request } from '.'

@Injectable({ scope: Scope.REQUEST })
export class UnleashContext {
  constructor(@Inject(REQUEST) private request: Request<{ id: string }>) {}

  getUserId(): string | undefined {
    return this.request.user?.id?.toString()
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
}
