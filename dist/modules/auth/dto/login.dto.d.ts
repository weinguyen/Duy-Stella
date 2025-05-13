import { Admin } from '../entities/admin.entity';
declare const LoginDto_base: import("@nestjs/common").Type<Omit<Admin, "id">>;
export declare class LoginDto extends LoginDto_base {
}
export {};
