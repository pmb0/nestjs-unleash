export interface UnleashStrategy {
  name: string

  isEnabled(parameters: unknown): boolean
}
