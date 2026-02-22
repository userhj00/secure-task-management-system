import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

import { Organization } from './entities/organization.entity';
import { UserEntity } from './entities/user.entity';
import { AuditLog } from './entities/audit-log.entity';

import { SeedService } from './seed/seed.service';
import { AuditModule } from './audit/audit.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get('DB_PATH') || './db.sqlite',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // needed for SeedService + other modules that use these repos
    TypeOrmModule.forFeature([Organization, UserEntity, AuditLog]),

    AuditModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}