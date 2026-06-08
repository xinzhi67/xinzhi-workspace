import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { IntentModule } from '../intent/intent.module';
import { AgentService } from './agent.service';

@Module({
  imports: [AiModule, IntentModule],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
