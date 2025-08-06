import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/auth/entities/user.entity';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Bookmark])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
