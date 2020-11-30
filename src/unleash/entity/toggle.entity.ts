import { Parameters } from '../..'
import { Feature, Strategy } from '../../unleash-client'

export class ToggleEntity {
  id: string

  name!: string
  description!: string
  enabled!: boolean
  strategies!: Strategy[]

  type?: string
  stale?: boolean
  strategy?: string
  parameters?: Parameters

  constructor(data: Feature) {
    Object.assign(this, data)
    this.id = data.name
  }
}
