import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}
  async create(createGuestDto: Partial<Guest>): Promise<Guest> {
    const guest = this.guestRepository.create(createGuestDto);
    return this.guestRepository.save(guest);
  }

  async findAll(): Promise<Guest[]> {
    return this.guestRepository.find();
  }
  async remove(id: string): Promise<void> {
    await this.guestRepository.delete(id);
  }
}
