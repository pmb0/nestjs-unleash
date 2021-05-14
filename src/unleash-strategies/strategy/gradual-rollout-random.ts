import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../../unleash'
import { randomGenerator } from '../util'
import { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutRandomParameters {
  percentage: `${number}`
}

@Injectable()
export class GradualRolloutRandomStrategy
  implements UnleashStrategy<GradualRolloutRandomParameters>
{
  name = 'gradualRolloutRandom'

  isEnabled(
    parameters: GradualRolloutRandomParameters,
    _context: UnleashContext,
  ): boolean {
    const percentage = parseInt(parameters.percentage, 10)

    return percentage >= randomGenerator()
  }
}
