import { Controller, Get, Query } from '@nestjs/common';
import { LinkedinPostService } from './linkedin-post.service';

@Controller('linkedin-post')
export class LinkedinPostController {
  constructor(private readonly linkedinPostService: LinkedinPostService) {}

  @Get('generate')
  async generatePost(
    @Query('userId') userId: string,
    @Query('eventId') eventId: string,
  ) {
    const content = await this.linkedinPostService.generatePost(
      userId,
      eventId,
    );
    return { content };
  }
}
