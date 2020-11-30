import { Injectable } from '@nestjs/common'
import { randomGenerator } from '../util'
import { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutRandomParameters {
  percentage: `${number}`
}

@Injectable()
export class GradualRolloutRandomStrategy implements UnleashStrategy {
  name = 'gradualRolloutRandom'

  isEnabled(parameters: GradualRolloutRandomParameters): boolean {
    const percentage = parseInt(parameters.percentage, 10)

    return percentage >= randomGenerator()
  }
}
