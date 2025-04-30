import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestService } from './guest.service';
export declare class GuestController {
    private readonly GuestService;
    constructor(GuestService: GuestService);
    create(createGuestDto: CreateGuestDto): Promise<import("./entities/guest.entity").Guest>;
    findall(): Promise<import("./entities/guest.entity").Guest[]>;
    remove(id: string): Promise<void>;
}
