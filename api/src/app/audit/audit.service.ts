import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog) private repo: Repository<AuditLog>,
  ) {}

  log(entry: Partial<AuditLog>) {
    return this.repo.save(this.repo.create(entry));
  }

  listForOrg(orgId: string) {
    return this.repo.find({ where: { orgId }, order: { createdAt: 'DESC' } });
  }
}