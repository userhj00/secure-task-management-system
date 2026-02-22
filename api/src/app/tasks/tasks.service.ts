import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { UserEntity } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  // ✅ LIST TASKS (ORG LEVEL)
  async listForUser(
    userId: string,
    orgId: string,
    page = 1,
    limit = 10,
    status?: string,
  ) {

    const qb = this.repo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owner','owner')
      .leftJoinAndSelect('task.organization','organization')
      .where('organization.id = :orgId',{ orgId });

    if(status){
      qb.andWhere('task.status = :status',{ status });
    }

    const [data,total] = await qb
      .skip((page-1)*limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      data,
    };
  }

  // ✅ CREATE
  async createForUser(userId:string, orgId:string, body:any){

    const user = await this.userRepo.findOne({ where:{ id:userId }});
    const org = await this.orgRepo.findOne({ where:{ id:orgId }});

    if(!user || !org)
      throw new NotFoundException('User or Org not found');

    const task = this.repo.create({
      title: body.title,
      description: body.description,
      status:'TODO',
      owner:user,
      organization:org,
    });

    return this.repo.save(task);
  }

  // ✅ GET ONE
  async getForUser(userId:string, orgId:string, id:string){

    const task = await this.repo.findOne({
      where:{ id },
      relations:['organization','owner']
    });

    if(!task)
      throw new NotFoundException('Task not found');

    if(task.organization.id !== orgId)
      throw new ForbiddenException('Not your organization task');

    return task;
  }

  // ✅ UPDATE (Owner + Admin allowed)
  async updateForUser(userId:string, orgId:string, id:string, body:any){

    const task = await this.getForUser(userId,orgId,id);

    Object.assign(task,body);

    return this.repo.save(task);
  }

  // ✅ DELETE (Owner only — controller already handles role)
  async deleteForUser(userId:string, orgId:string, id:string){

    const task = await this.getForUser(userId,orgId,id);

    await this.repo.remove(task);

    return { deleted:true };
  }
}