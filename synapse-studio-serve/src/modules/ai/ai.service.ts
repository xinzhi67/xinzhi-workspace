import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

export interface AiGenerationOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AiTextResult {
  text: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly configService: ConfigService) {}

  async generateText(prompt: string, options: AiGenerationOptions = {}): Promise<AiTextResult> {
    this.logger.debug(`generateText prompt=${prompt} model=${options.model ?? 'default'}`);
    return {
      text: `【AI 文本输出】${prompt}`,
      metadata: {
        model: options.model ?? 'default',
        temperature: options.temperature ?? 0.7,
      },
    };
  }

  async generateDesignSpec(prompt: string): Promise<{ specification: string; brief: string }> {
    this.logger.debug(`generateDesignSpec prompt=${prompt}`);
    return {
      brief: `这是一个基于用户意图的设计稿大纲，来源于：${prompt}`,
      specification: `页面结构、组件列表、布局建议和风格指引。

- 页面类型：${prompt}
- 主要目标：快速落地前端设计稿
- 输出结果：可直接渲染为 JSON 设计稿`,
    };
  }

  async generateImage(prompt: string): Promise<{ url: string; provider: string }> {
    this.logger.debug(`generateImage prompt=${prompt}`);
    return {
      url: `https://placeholder.synapse.ai/image?prompt=${encodeURIComponent(prompt)}`,
      provider: 'mock-ai-provider',
    };
  }
}
