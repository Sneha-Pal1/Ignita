import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event!: Event;

  @CreateDateColumn()
  createdAt!: Date;
}
