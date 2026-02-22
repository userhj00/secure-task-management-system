import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { RequestUser } from '../auth/request-user.interface';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // ✅ LIST TASKS (with pagination + filter)
  @Get()
  @Roles('Owner', 'Admin', 'Viewer')
  list(
    @Req() req: { user: RequestUser },
    @Query() query: ListTasksDto,
  ) {
    return this.tasksService.listForUser(
      req.user.userId,
      req.user.orgId,
      query.page,
      query.limit,
      query.status,
    );
  }

  // ✅ CREATE TASK
  @Post()
  @Roles('Owner', 'Admin')
  create(
    @Req() req: { user: RequestUser },
    @Body() body: CreateTaskDto,
  ) {
    return this.tasksService.createForUser(
      req.user.userId,
      req.user.orgId,
      body,
    );
  }

  // ✅ GET ONE TASK
  @Get(':id')
  @Roles('Owner', 'Admin', 'Viewer')
  getOne(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
  ) {
    return this.tasksService.getForUser(
      req.user.userId,
      req.user.orgId,
      id,
    );
  }

  // ✅ UPDATE TASK
  @Patch(':id')
  @Roles('Owner', 'Admin')
  update(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.updateForUser(
      req.user.userId,
      req.user.orgId,
      id,
      body,
    );
  }

  // ✅ DELETE TASK
  @Delete(':id')
  @Roles('Owner')
  delete(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
  ) {
    return this.tasksService.deleteForUser(
      req.user.userId,
      req.user.orgId,
      id,
    );
  }
}