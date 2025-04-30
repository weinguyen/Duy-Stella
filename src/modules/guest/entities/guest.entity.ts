import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;
  @Column()
  @IsString()
  @ApiProperty()
  name: string;
  @Column()
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @Column()
  @IsString()
  phone: string;
  @Column()
  @ApiProperty()
  @IsString()
  message: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;
}
