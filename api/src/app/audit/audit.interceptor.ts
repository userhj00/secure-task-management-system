import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private audit: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return next.handle().pipe(
      tap((result) => {
        if (!user) return;

        const method = req.method;
        const path = req.route?.path || req.url;

        const action = `${method} ${path}`;

        // If this is tasks, try best effort resourceId
       // const resourceType = req.baseUrl?.includes('tasks') ? 'Task' : 'Unknown';
        const resourceId = req.params?.id || (result?.id ?? 'n/a');

        // Only log mutating actions (POST/PATCH/DELETE)
        if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) return;

        void this.audit.log({
          action,
          actorUserId: user.userId,
          orgId: user.orgId,
          entityId: resourceId,
        });
      }),
    );
  }
}