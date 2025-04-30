import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { Guest } from './entities/guest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
