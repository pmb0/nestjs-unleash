import { UnleashContext } from '../unleash.context'

export interface UnleashStrategy {
  name: string

  isEnabled(parameters: unknown, context: UnleashContext): boolean
}
