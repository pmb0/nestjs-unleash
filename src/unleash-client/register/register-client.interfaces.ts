export interface UnleashRegisterClientRequestPayload {
  appName: string
  instanceId: string
  sdkVersion: string
  strategies: string[]
  started: string
  interval: number
}

export type UnleashRegisterClientReponsePayload = number
