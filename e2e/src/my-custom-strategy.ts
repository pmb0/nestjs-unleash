import { Injectable } from '@nestjs/common'
import { UnleashStrategy } from '../../src'

@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = 'MyCustomStrategy'

  isEnabled(_parameters: unknown): boolean {
    // eslint-disable-next-line no-magic-numbers
    return Math.random() < 0.5
  }
}
