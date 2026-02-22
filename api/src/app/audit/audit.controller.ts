import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('audit-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {

  constructor(private auditService: AuditService) {}

  @Get()
  @Roles('Owner')
  list(@Req() req: any) {
    return this.auditService.listForOrg(req.user.orgId);
  }
}