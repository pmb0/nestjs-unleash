import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../../unleash'
import { normalizedValue, randomGenerator } from '../util'
import { UnleashStrategy } from './strategy.interface'

export enum UnleashStickiness {
  default = 'default',
  userId = 'userId',
  sessionId = 'sessionId',
  random = 'random',
}

export interface FlexibleRolloutParameters {
  rollout: `${number}`
  stickiness: UnleashStickiness
  groupId: string
}

@Injectable()
export class FlexibleRolloutStrategy
  implements UnleashStrategy<FlexibleRolloutParameters>
{
  name = 'flexibleRollout'

  // eslint-disable-next-line complexity
  resolveStickiness(
    stickiness: UnleashStickiness | undefined,
    context: UnleashContext,
  ): string | undefined {
    const userId = context.getUserId()
    const sessionId = context.getSessionId()

    switch (stickiness) {
      case UnleashStickiness.userId:
        return userId
      case UnleashStickiness.sessionId:
        return sessionId
      case UnleashStickiness.random:
        return randomGenerator().toString()
      default:
        return userId || sessionId || randomGenerator().toString()
    }
  }

  // eslint-disable-next-line complexity
  isEnabled(
    parameters: FlexibleRolloutParameters,
    context: UnleashContext,
  ): boolean {
    const groupId = parameters.groupId
    const percentage = Number(parameters.rollout)
    const stickiness = parameters.stickiness || UnleashStickiness.default
    const stickinessId = this.resolveStickiness(stickiness, context)

    if (!stickinessId) {
      return false
    }

    const normalizedUserId = normalizedValue(stickinessId, groupId)

    return percentage > 0 && normalizedUserId <= percentage
  }
}
