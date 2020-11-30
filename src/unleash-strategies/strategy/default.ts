import { UnleashStrategy } from './strategy.interface'

export class DefaultStrategy implements UnleashStrategy {
  name = 'default'

  isEnabled(_parameters: never): boolean {
    return true
  }
}
