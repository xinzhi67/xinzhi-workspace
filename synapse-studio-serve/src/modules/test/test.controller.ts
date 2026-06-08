import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly config: ConfigService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.testService.getHello();
  }

  /** 验证 MySQL 连接及 design_generations 表是否存在（需配置 DB_* 环境变量） */
  @Get('db')
  async checkDb() {
    try {
      const ping = await this.dataSource.query('SELECT 1 AS ok');
      const tableRows = await this.dataSource.query<{ cnt: string }[]>(
        `SELECT COUNT(*) AS cnt FROM information_schema.tables WHERE table_schema = ? AND table_name = 'design_generations'`,
        [this.config.dbName],
      );
      const cnt = Number(tableRows[0]?.cnt ?? 0);
      return {
        ok: true,
        database: this.config.dbName,
        ping,
        designGenerationsTablePresent: cnt > 0,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new ServiceUnavailableException({
        ok: false,
        database: this.config.dbName,
        error: message,
      });
    }
  }
}
