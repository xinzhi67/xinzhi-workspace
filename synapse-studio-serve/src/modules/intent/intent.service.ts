import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { IntentResult } from './entities/intent-result';

@Injectable()
export class IntentService {
  private readonly logger = new Logger(IntentService.name);

  constructor(private readonly aiService: AiService) {}

  async recognizeIntent(text: string): Promise<IntentResult> {
    this.logger.log('识别用户意图');

    const fallbackIntent = this.extractIntentFromText(text);
    const aiResponse = await this.aiService.generateText(
      `将用户文本转换为结构化意图：${text}`,
      { temperature: 0.2 },
    );

    return {
      intent: fallbackIntent,
      confidence: 0.92,
      entities: {
        text,
        aiHint: aiResponse.text,
      },
    };
  }

  private extractIntentFromText(text: string): string {
    const normalized = text.toLowerCase();

    if (normalized.includes('设计') || normalized.includes('样式') || normalized.includes('页面')) {
      return 'design.generate';
    }

    if (normalized.includes('分析') || normalized.includes('意图')) {
      return 'intent.analyze';
    }

    return 'general.assistant';
  }
}
