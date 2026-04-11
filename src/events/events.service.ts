import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto, user: User) {
    const event = this.eventRepo.create({
      ...dto,
      createdBy: user,
    });
    return await this.eventRepo.save(event);
  }
  async findAll() {
    return await this.eventRepo.find();
  }
  async findOne(id: string) {
    return await this.eventRepo.findOneBy({ id });
  }
  async update(id: string, dto: UpdateEventDto) {
    return await this.eventRepo.update(id, dto);
  }
  async remove(id: string) {
    return await this.eventRepo.delete(id);
  }
}
