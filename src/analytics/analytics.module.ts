import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { User } from '../auth/entities/user.entity';
import { Bookmark } from '../bookmark/entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Bookmark])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
