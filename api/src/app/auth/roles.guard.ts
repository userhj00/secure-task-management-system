import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

    if (!requiredRoles || requiredRoles.length === 0)
      return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.role)
      return false;

    const roleHierarchy: Record<string, number> = {
      Owner: 3,
      Admin: 2,
      Viewer: 1,
    };

    const userLevel = roleHierarchy[user.role] ?? 0;

    const requiredLevel = Math.min(
      ...requiredRoles.map(r => roleHierarchy[r] ?? 0)
    );

    return userLevel >= requiredLevel;
  }
}