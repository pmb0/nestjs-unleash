export interface GetFeaturesResponse {
  version: number
  features: Feature[]
}


export interface Feature {
  name: string
  description: string
  enabled: boolean
  strategies: Strategy[]
  createdAt: string
  variants: Variant[]

  type?: string
  stale?: boolean
  strategy?: string
  parameters?: Parameters
}

export interface Variant {
  name: string
  weight: number
  stickiness: string
  payload: Payload
  overrides: any[]
  weightType: string
}

export interface Payload {
  type: 'string' | 'json' | 'csv'
  value: string
}

export interface Strategy {
  name: string
  parameters: Parameters
}

export interface Parameters {
  [name: string]: string | number
}
