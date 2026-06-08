import { Body, Controller, Post } from '@nestjs/common';
import { DesignService } from './design.service';
import { GenerateDesignDto } from './dto/generate-design.dto';

@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post('generate')
  async generate(@Body() payload: GenerateDesignDto) {
    return this.designService.generateDesign(payload);
  }
}
