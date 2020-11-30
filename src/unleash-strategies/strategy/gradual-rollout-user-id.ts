import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../unleash.context'
import { normalizedValue } from '../util'
import { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutUserIdParameters {
  percentage: `${number}`
  groupId: string
}

@Injectable()
export class GradualRolloutUserIdStrategy implements UnleashStrategy {
  name = 'gradualRolloutUserId'

  constructor(private readonly context: UnleashContext) {}

  isEnabled(parameters: GradualRolloutUserIdParameters): boolean {
    const userId = this.context.getUserId()

    if (!userId) {
      return false
    }

    const percentage = Number(parameters.percentage)

    const normalizedUserId = normalizedValue(userId, parameters.groupId)

    return percentage > 0 && normalizedUserId <= percentage
  }
}
