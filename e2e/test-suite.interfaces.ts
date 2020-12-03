export interface TestSuite {
  name: string
  state: State
  tests: Test[]
}

export interface State {
  version: number
  features: Feature[]
}

export interface Feature {
  name: string
  description?: string
  enabled: boolean
  strategies: Strategy[]
}

export interface Strategy {
  name: string
  parameters?: Parameters
}

export interface Parameters {
  userIds: string
}

export interface Test {
  description: string
  context: Context
  toggleName: string
  expectedResult: boolean
}

export interface Context {
  userId?: string
  sessionId?: string
  remoteAddress?: string
}
