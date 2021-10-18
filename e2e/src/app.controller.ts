import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { IfEnabled } from '../../src/unleash'
import { UnleashService } from '../../src/unleash/unleash.service'
import { UserGuard } from './user.guard'

export interface MyCustomData {
  foo: string
}

@Controller()
@UseGuards(UserGuard)
export class AppController {
  constructor(private readonly unleash: UnleashService<MyCustomData>) {}

  @Get('/')
  index(): string {
    return this.unleash.isEnabled('test')
      ? 'feature is active'
      : 'feature is not active'
  }

  @IfEnabled('test')
  @Get('/content')
  getContent(): string {
    return 'my content'
  }

  @Get('/custom-context/:foo')
  customContext(@Param('foo') foo: string): string {
    // Provide "foo" as custom context data
    return this.unleash.isEnabled('test', undefined, { foo })
      ? 'feature is active'
      : 'feature is not active'
  }
}
