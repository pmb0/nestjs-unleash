// https://github.com/SerayaEryn/fastify-session/blob/master/types/types.d.ts
export interface FastifySession {
  sessionId: string
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts
export interface ExpressSession {
  id: string
}

export type Request<T> = {
  user?: T
  ip?: string
  session?: FastifySession | ExpressSession
}

export interface Properties {
  [key: string]: string | undefined | number
}

export interface Context {
  [key: string]: string | undefined | number | Properties
  userId?: string
  sessionId?: string
  remoteAddress?: string
  environment?: string
  appName?: string
  properties?: Properties
}
