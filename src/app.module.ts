import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
    }),
    ChallengeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
