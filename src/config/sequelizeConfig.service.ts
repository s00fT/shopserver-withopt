import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize'
import { User } from '../users/users.model'

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    console.log('📦 DB ENV:', {
      dialect: process.env.SQL_DIALECT,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASSWORD,
      db: process.env.DATABASE_NAME,
    });

    const config = this.configService.get('database');

    console.log('🔍 CONFIG SERVICE RESULT:', config);
    
    const {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
    } = this.configService.get('database');

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    };
  }
}
