import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkedinPostService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async generatePost(userId: string, eventId: string): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const event = await this.eventRepo.findOne({ where: { id: eventId } });

    if (!user || !event) {
      throw new NotFoundException('User or Event not found');
    }

    return `🎉 I just participated in "${event.title}"! 
It was an amazing experience to connect, learn, and grow.
Thank you "${event.organizer}" and the entire team for organizing such a wonderful event. 

#Ignita #${event.type || 'Event'} #${user.role || 'Student'} #Growth`;
  }
}
