import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: string, eventId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const bookmark = this.bookmarkRepo.create({ user, event });
    return await this.bookmarkRepo.save(bookmark);
  }

  async findAll() {
    return await this.bookmarkRepo.find({ relations: ['user', 'event'] });
  }

  async findOne(id: string) {
    return await this.bookmarkRepo.findOne({
      where: { id },
      relations: ['user', 'event'],
    });
  }

  async remove(id: string) {
    const result = await this.bookmarkRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Bookmark not found');
    return { message: 'Bookmark deleted successfully' };
  }
}
