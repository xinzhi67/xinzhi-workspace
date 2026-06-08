import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateDesignDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsOptional()
  appId?: string;
}
