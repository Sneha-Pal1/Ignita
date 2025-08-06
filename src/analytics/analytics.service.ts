import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}
  async getStats() {
    const totalEvents = await this.eventRepository.count();
    const totalUsers = await this.userRepository.count();
    const totalBookmarks = await this.bookmarkRepository.count();

    return {
      totalEvents,
      totalUsers,
      totalBookmarks,
    };
  }

  async getEventsGroupedByDate() {
    return this.eventRepository
      .createQueryBuilder('event')
      .select("DATE_TRUNC('month', event.createdAt)", 'month')
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }
}
