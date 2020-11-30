export interface ToggleMetrics {
  yes: number
  no: number
}

export interface Toggles {
  [name: string]: ToggleMetrics
}

export interface Bucket {
  start: string
  stop: string
  toggles: Toggles
}

export interface SendMetricsRequestBody {
  appName: string
  instanceId: string
  bucket: Bucket
}
