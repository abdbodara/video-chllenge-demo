import { IsString, IsInt, Min, Max, IsEnum } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsInt()
  @Min(1)
  @Max(365)
  durationInDays: number;

  @IsEnum(['public', 'private'])
  visibility: string;
}
