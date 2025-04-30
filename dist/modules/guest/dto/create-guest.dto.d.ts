import { Guest } from '../entities/guest.entity';
declare const CreateGuestDto_base: import("@nestjs/common").Type<Omit<Guest, "id" | "createdAt">>;
export declare class CreateGuestDto extends CreateGuestDto_base {
}
export {};
