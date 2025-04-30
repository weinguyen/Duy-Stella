import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
export declare class GuestService {
    private readonly guestRepository;
    constructor(guestRepository: Repository<Guest>);
    create(createGuestDto: Partial<Guest>): Promise<Guest>;
    findAll(): Promise<Guest[]>;
    remove(id: string): Promise<void>;
}
