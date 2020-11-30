import { Injectable } from '@nestjs/common'
import { hostname as osHostname } from 'os'
import { UnleashStrategy } from './strategy.interface'

export interface HostnameParameters {
  hostNames: string
}

@Injectable()
export class ApplicationHostnameStrategy implements UnleashStrategy {
  name = 'applicationHostname'
  hostname = osHostname()

  isEnabled(parameters: HostnameParameters): boolean {
    if (!parameters.hostNames) {
      return false
    }

    return parameters.hostNames
      .toLowerCase()
      .split(/\s*,\s*/)
      .includes(this.hostname)
  }
}
