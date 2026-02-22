import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'text', default: 'TODO' })
  status!: TaskStatus;

  // IMPORTANT: use function reference
  @ManyToOne(() => UserEntity, (user) => undefined, { eager: true })
  @JoinColumn({ name: 'ownerUserId' })
  owner!: UserEntity;

  @ManyToOne(() => Organization, (org) => undefined, { eager: true })
  @JoinColumn({ name: 'orgId' })
  organization!: Organization;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}