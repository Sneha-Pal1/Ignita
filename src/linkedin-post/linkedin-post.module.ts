import { Module } from '@nestjs/common';
import { LinkedinPostController } from './linkedin-post.controller';
import { LinkedinPostService } from './linkedin-post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])],
  controllers: [LinkedinPostController],
  providers: [LinkedinPostService],
})
export class LinkedinPostModule {}
