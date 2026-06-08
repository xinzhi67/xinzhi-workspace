import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(): string {
    return '你好，xinzhi。欢迎来到你的智能工作空间';
  }
}
