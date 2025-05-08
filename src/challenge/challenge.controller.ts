import {
  Controller,
  Get,
  Query,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  // POST /challenges - Create a new challenge
  @Post()
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<{ message: string; data: Challenge }> {
    const newChallenge = await this.challengeService.create(createChallengeDto);
    return {
      message: 'Challenge successfully created',
      data: newChallenge,
    };
  }

  // GET /challenges/:id - Get a single challenge by ID
  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<{ message: string; data: Challenge }> {
    const challenge = await this.challengeService.findOne(id);
    return {
      message: 'Challenge successfully fetched',
      data: challenge,
    };
  }

  // GET /challenges - List all challenges
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('visibility') visibility?: string,
  ): Promise<{
    message: string;
    data: Challenge[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const result = await this.challengeService.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      category,
      visibility,
    });

    return {
      message: 'Challenges successfully fetched',
      ...result,
    };
  }

  // PUT /challenges/:id - Update a challenge by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<{ message: string; data: Challenge }> {
    const updatedChallenge = await this.challengeService.update(
      id,
      updateChallengeDto,
    );
    return {
      message: 'Challenge successfully updated',
      data: updatedChallenge,
    };
  }

  // DELETE /challenges/:id - Delete a challenge by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.challengeService.remove(id);
    return {
      message: 'Challenge successfully deleted',
    };
  }
}
