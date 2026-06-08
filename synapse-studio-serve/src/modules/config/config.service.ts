import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return Number(process.env.PORT ?? 5000);
  }

  get openAiApiKey(): string {
    return process.env.OPENAI_API_KEY ?? '';
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV ?? 'development';
  }

  get dbHost(): string {
    return process.env.DB_HOST ?? '127.0.0.1';
  }

  get dbPort(): number {
    return Number(process.env.DB_PORT ?? 3306);
  }

  get dbUser(): string {
    return process.env.DB_USER ?? 'root';
  }

  get dbPassword(): string {
    return process.env.DB_PASSWORD ?? '674119';
  }

  get dbName(): string {
    return process.env.DB_NAME ?? 'synapse_studio';
  }
}
