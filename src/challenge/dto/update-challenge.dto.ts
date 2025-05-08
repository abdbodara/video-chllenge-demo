import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  durationInDays?: number;

  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: string;

  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: string;
}
