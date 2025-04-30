import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestService } from './guest.service';
@Controller('guest')
export class GuestController {
  constructor(private readonly GuestService: GuestService) {}
  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.GuestService.create(createGuestDto);
  }
  @Get()
  findall() {
    return this.GuestService.findAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.GuestService.remove(id);
  }
}
