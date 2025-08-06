import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AlertsModule } from './alerts/alerts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { LinkedinPostModule } from './linkedin-post/linkedin-post.module';
import { Event } from '../src/events/entities/event.entity';
import { Bookmark } from '../src/bookmark/entities/bookmark.entity';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Bookmark, Event],
    }),
    AuthModule,
    UserModule,
    EventsModule,
    AlertsModule,
    BookmarkModule,
    LinkedinPostModule,
    AnalyticsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
