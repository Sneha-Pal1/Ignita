import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';
import { EventCategory } from '../enums/event-category.enum';
import { EventType } from '../enums/event-type.enum';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsEnum(EventCategory)
  category!: EventCategory;

  @IsEnum(EventType)
  type!: EventType;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsString()
  registrationLink?: string;
}
