import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class SeedService implements OnModuleInit {

  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
  ) {}

  async onModuleInit() {

    const userCount = await this.userRepo.count();
    if (userCount > 0) return;

    console.log('Seeding initial data...');

    const passwordHash = await bcrypt.hash('Password123!', 10);

    // ✅ ORG A
    const orgA = await this.orgRepo.save({
      name: 'Demo Organization A',
    });

    await this.userRepo.save([
      {
        email: 'ownerA@demo.com',
        passwordHash,
        role: 'Owner',
        organization: orgA,
      },
      {
        email: 'adminA@demo.com',
        passwordHash,
        role: 'Admin',
        organization: orgA,
      },
      {
        email: 'viewerA@demo.com',
        passwordHash,
        role: 'Viewer',
        organization: orgA,
      },
    ]);

    // ✅ ORG B (second organization)
    const orgB = await this.orgRepo.save({
      name: 'Demo Organization B',
    });

    await this.userRepo.save([
      {
        email: 'ownerB@demo.com',
        passwordHash,
        role: 'Owner',
        organization: orgB,
      },
      {
        email: 'viewerB@demo.com',
        passwordHash,
        role: 'Viewer',
        organization: orgB,
      },
    ]);

    console.log('Seed complete with multiple organizations');
  }
}