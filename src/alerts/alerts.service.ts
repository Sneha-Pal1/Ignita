import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepo: Repository<Alert>,
  ) {}

  async create(message: string, userId: string) {
    const alert = this.alertRepo.create({
      message,
      user: { id: userId },
    });
    return this.alertRepo.save(alert);
  }

  async findAllForUser(userId: string) {
    return this.alertRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(alertId: string) {
    return this.alertRepo.update(alertId, { read: true });
  }

  async delete(alertId: string) {
    return this.alertRepo.delete(alertId);
  }
}
