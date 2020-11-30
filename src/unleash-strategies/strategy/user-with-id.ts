import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../unleash.context'
import { UnleashStrategy } from './strategy.interface'

export interface UserWithIdParameters {
  userIds: string
}

@Injectable()
export class UserWithIdStrategy implements UnleashStrategy {
  name = 'userWithId'

  constructor(private readonly context: UnleashContext) {}

  isEnabled(parameters: UserWithIdParameters): boolean {
    const userId = this.context.getUserId()

    if (!userId) {
      return false
    }

    const userIds = parameters.userIds.split(/\s*,\s*/)

    return userIds.includes(userId)
  }
}
