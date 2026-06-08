import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../modules/config/config.module';
import { ConfigService } from '../modules/config/config.service';
import { DesignGeneration } from '../modules/design/entities/design-generation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        entities: [DesignGeneration],
        synchronize: false,
        logging: config.nodeEnv === 'development',
      }),
    }),
  ],
})
export class DatabaseModule {}
