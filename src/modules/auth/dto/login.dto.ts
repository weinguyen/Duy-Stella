import { OmitType } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entity';

export class LoginDto extends OmitType(Admin, ['id']) {}
