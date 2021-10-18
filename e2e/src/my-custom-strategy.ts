import { Injectable } from '@nestjs/common'
import { UnleashContext, UnleashStrategy } from '../../src'
import { MyCustomData } from './app.controller'

@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = 'MyCustomStrategy'

  isEnabled(
    _parameters: unknown,
    context: UnleashContext<MyCustomData>,
  ): boolean {
    return context.customData?.foo === 'bar'
  }
}
