import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { ModuleRef, Reflector } from '@nestjs/core'
import { UnleashService } from '../unleash.service'

@Injectable()
export class IfEnabledGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly unleash: UnleashService,
    private readonly moduleRef: ModuleRef,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const toggle = this.reflector.get<string>(
      METADATA_TOGGLE_NAME,
      context.getHandler(),
    )

    if (!this.unleash.isEnabled(toggle)) {
      throw new NotFoundException()
    }

    return true
  }
}

export const METADATA_TOGGLE_NAME = 'toggleName'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function IfEnabled(toggleName: string) {
  return applyDecorators(
    SetMetadata(METADATA_TOGGLE_NAME, toggleName),
    UseGuards(IfEnabledGuard),
  )
}
