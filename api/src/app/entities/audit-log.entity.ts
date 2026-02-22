import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  action!: string;

  @Column()
  actorUserId!: string;

  @Column()
  orgId!: string;

  @Column({ nullable: true })
  entityId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}