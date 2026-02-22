import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async login(email: string, password: string) {
  const user = await this.userRepo.findOne({
    where: { email },
    relations: ['organization'],
  });

  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new UnauthorizedException('Invalid credentials');

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    orgId: user.organization.id,
  };

  const token = await this.jwt.signAsync(payload);

  return {
    access_token: token,
    user: {
      email: user.email,
      role: user.role,
    },
  };
}
}