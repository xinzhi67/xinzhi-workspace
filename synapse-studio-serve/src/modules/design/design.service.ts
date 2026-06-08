import { Injectable, Logger } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import { IntentService } from '../intent/intent.service';
import { AiService } from '../ai/ai.service';
import { GenerateDesignDto } from './dto/generate-design.dto';
import { DesignDraft } from './entities/design-draft';

@Injectable()
export class DesignService {
  private readonly logger = new Logger(DesignService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly intentService: IntentService,
    private readonly agentService: AgentService,
  ) {}

  async generateDesign(dto: GenerateDesignDto): Promise<DesignDraft> {
    this.logger.log('触发设计生成流程');

    const intent = await this.intentService.recognizeIntent(dto.prompt);
    return this.agentService.executeDesignLoop(dto.prompt, intent);
  }
}
