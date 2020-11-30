import { Controller, Get, UseGuards } from '@nestjs/common'
import { IfEnabled } from '../../src/unleash'
import { UnleashService } from '../../src/unleash/unleash.service'
import { UserGuard } from './user.guard'

@Controller()
@UseGuards(UserGuard)
export class AppController {
  constructor(private readonly unleash: UnleashService) {}

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
}
