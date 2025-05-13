import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  @ApiProperty()
  @IsString()
  username: string;
  @Column()
  @ApiProperty()
  @IsString()
  password: string;
}
