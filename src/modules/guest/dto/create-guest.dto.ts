import { OmitType } from '@nestjs/swagger';
import { Guest } from '../entities/guest.entity';

export class CreateGuestDto extends OmitType(Guest, [
  'id',
  'createdAt',
] as const) {}
