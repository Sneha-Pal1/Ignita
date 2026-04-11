import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventCategory } from '../enums/event-category.enum';
import { EventType } from '../enums/event-type.enum';
import { User } from '../../auth/entities/user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: EventCategory })
  category!: EventCategory;

  @Column({ type: 'enum', enum: EventType })
  type!: EventType;

  @Column({ nullable: true })
  organizer?: string;

  @Column({ nullable: true })
  registrationLink?: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  createdBy?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
