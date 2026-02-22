import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { UserEntity } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';

import { AuditModule } from '../audit/audit.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([
      Task,
      UserEntity,
      Organization,
    ]),
    AuditModule,
  ],
})
export class TasksModule {}