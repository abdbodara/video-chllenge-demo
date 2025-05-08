import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  durationInDays: number;

  @Column({ default: 'public' })
  visibility: string;
}
