import { Module } from '@nestjs/common';
import { LinkedinPostController } from './linkedin-post.controller';
import { LinkedinPostService } from './linkedin-post.service';

@Module({
  controllers: [LinkedinPostController],
  providers: [LinkedinPostService]
})
export class LinkedinPostModule {}
