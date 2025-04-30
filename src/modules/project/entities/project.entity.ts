import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  @ApiProperty()
  @IsString()
  title: string;
  @IsString()
  @ApiProperty()
  @Column()
  description: string;
  @ApiProperty()
  @Column()
  @IsString()
  github: string;
  @ApiProperty()
  @Column()
  @IsString()
  image: string;
}
