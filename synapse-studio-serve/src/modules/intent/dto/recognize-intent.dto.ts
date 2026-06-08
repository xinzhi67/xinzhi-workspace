import { IsNotEmpty, IsString } from 'class-validator';

export class RecognizeIntentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
