import { Injectable } from '@nestjs/common'
import { UnleashStrategy } from '../../src'

@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = 'MyCustomStrategy'

  isEnabled(_parameters: unknown): boolean {
    return true
  }
}
