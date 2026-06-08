import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { IntentService } from '../intent/intent.service';
import { DesignDraft } from '../design/entities/design-draft';
import { IntentResult } from '../intent/entities/intent-result';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly intentService: IntentService,
  ) {}

  async executeDesignLoop(userPrompt: string, intent: IntentResult): Promise<DesignDraft> {
    this.logger.log('开始 agent 设计生成循环');

    const initialDraft = await this.createInitialDesignDraft(userPrompt, intent);
    const refined = await this.refineDraft(initialDraft, userPrompt, intent);

    return refined;
  }

  private async createInitialDesignDraft(userPrompt: string, intent: IntentResult): Promise<DesignDraft> {
    const spec = await this.aiService.generateDesignSpec(`${intent.intent} ${userPrompt}`);

    return {
      title: `设计稿：${intent.intent}`,
      description: spec.brief,
      components: [
        {
          type: 'page',
          props: {
            layout: 'adaptive',
            summary: spec.specification,
          },
        },
      ],
      metadata: {
        source: 'agent-initial-draft',
        intent,
      },
    };
  }

  private async refineDraft(draft: DesignDraft, userPrompt: string, intent: IntentResult): Promise<DesignDraft> {
    const refineText = await this.aiService.generateText(
      `请根据用户需求和初步设计稿优化：${userPrompt}
当前设计稿：${draft.description}`,
      { temperature: 0.5 },
    );

    return {
      ...draft,
      description: `${draft.description}

优化建议：${refineText.text}`,
      metadata: {
        ...draft.metadata,
        refinedBy: 'agent-loop',
      },
    };
  }
}
