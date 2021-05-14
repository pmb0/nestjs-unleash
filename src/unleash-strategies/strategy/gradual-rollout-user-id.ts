import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../../unleash'
import { normalizedValue } from '../util'
import { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutUserIdParameters {
  percentage: `${number}`
  groupId: string
}

@Injectable()
export class GradualRolloutUserIdStrategy
  implements UnleashStrategy<GradualRolloutUserIdParameters>
{
  name = 'gradualRolloutUserId'

  isEnabled(
    parameters: GradualRolloutUserIdParameters,
    context: UnleashContext,
  ): boolean {
    const userId = context.getUserId()

    if (!userId) {
      return false
    }

    const percentage = Number(parameters.percentage)

    const normalizedUserId = normalizedValue(userId, parameters.groupId)

    return percentage > 0 && normalizedUserId <= percentage
  }
}
