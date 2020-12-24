import { Request } from 'express'
import { UnleashContext } from '../unleash'

export interface TestContextOptions {
  remoteAddress?: string
  request?: any
  userId?: string
  sessionId?: string
}

export function createContext({
  remoteAddress,
  request = {},
  sessionId,
  userId,
}: TestContextOptions = {}): UnleashContext {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    getRemoteAddress: () => remoteAddress,
    getSessionId: () => sessionId,
    getUserId: () => userId,
    request: request as Request,
  }
}
