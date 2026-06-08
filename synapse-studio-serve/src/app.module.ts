import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AgentModule } from './modules/agent/agent.module';
import { AiModule } from './modules/ai/ai.module';
import { ConfigModule } from './modules/config/config.module';
import { DesignModule } from './modules/design/design.module';
import { IntentModule } from './modules/intent/intent.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AiModule, IntentModule, DesignModule, AgentModule, TestModule],
})
export class AppModule {}
