import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Organization } from './organization.entity';

export type UserRole = 'Owner' | 'Admin' | 'Viewer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'text', default: 'Viewer' })
  role!: UserRole;

  @ManyToOne(() => Organization, { eager: true })
  @JoinColumn({ name: 'orgId' })
  organization!: Organization;
}