import { UnleashContext } from '../../unleash'

export interface UnleashStrategy {
  name: string

  isEnabled(parameters: unknown, context: UnleashContext): boolean
}
