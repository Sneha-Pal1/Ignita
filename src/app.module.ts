import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [AuthModule, UserModule, EventsModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
