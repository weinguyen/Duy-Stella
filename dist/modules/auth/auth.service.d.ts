import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly AdminRespository;
    constructor(jwtService: JwtService, AdminRespository: Repository<Admin>);
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
