import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  // Create a new challenge
  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const challenge = this.challengeRepository.create(createChallengeDto);
    return this.challengeRepository.save(challenge);
  }

  // Get a single challenge by ID
  async findOne(id: number): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOneBy({ id });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  // List all challenges
  async findAll({
    page,
    limit,
    search,
    category,
    visibility,
  }: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    visibility?: string;
  }): Promise<{
    data: Challenge[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const where: any = {};

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    if (category) {
      where.category = category;
    }

    if (visibility) {
      where.visibility = visibility;
    }

    const [data, total] = await this.challengeRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Update an existing challenge
  async update(
    id: number,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    const challenge = await this.findOne(id); // Ensure the challenge exists
    Object.assign(challenge, updateChallengeDto);
    return this.challengeRepository.save(challenge);
  }

  // Delete a challenge by ID
  async remove(id: number): Promise<void> {
    const challenge = await this.findOne(id); // Ensure the challenge exists
    await this.challengeRepository.remove(challenge);
  }
}
