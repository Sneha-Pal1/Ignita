import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AlertsModule } from './alerts/alerts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark, Event } from 'libs/database/entities';
import { User } from './auth/entities/user.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { LinkedinPostModule } from './linkedin-post/linkedin-post.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
