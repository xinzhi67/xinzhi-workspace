import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { AgentModule } from '../agent/agent.module';
import { IntentModule } from '../intent/intent.module';
import { DesignController } from './design.controller';
import { DesignService } from './design.service';

@Module({
  imports: [AiModule, IntentModule, AgentModule],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
