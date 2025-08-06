import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getStats() {
    return this.analyticsService.getStats();
  }

  @Get('events-by-month')
  async getEventsByMonth() {
    return this.analyticsService.getEventsGroupedByDate();
  }
}
