/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable } from '@nestjs/common'
import * as ip from 'ip'
import { isIP } from 'net'
import { UnleashContext } from '../unleash.context'
import { UnleashStrategy } from './strategy.interface'

export interface RemoteAddressParameters {
  IPs: string
}

@Injectable()
export class RemoteAddressStrategy implements UnleashStrategy {
  name = 'remoteAddress'

  constructor(private readonly context: UnleashContext) {}

  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  isEnabled(parameters: RemoteAddressParameters): boolean {
    const remoteAddress = this.context.getRemoteAddress()

    if (!parameters.IPs || !remoteAddress) {
      return false
    }

    for (const range of parameters.IPs.split(/\s*,\s*/)) {
      if (range === remoteAddress) {
        return true
      }
      if (!isIP(range) && ip.cidrSubnet(range).contains(remoteAddress)) {
        return true
      }
    }

    return false
  }
}
