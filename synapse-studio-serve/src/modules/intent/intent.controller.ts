import { Body, Controller, Post } from '@nestjs/common';
import { IntentService } from './intent.service';
import { RecognizeIntentDto } from './dto/recognize-intent.dto';

@Controller('intent')
export class IntentController {
  constructor(private readonly intentService: IntentService) {}

  @Post('recognize')
  async recognize(@Body() payload: RecognizeIntentDto) {
    return this.intentService.recognizeIntent(payload.text);
  }
}
