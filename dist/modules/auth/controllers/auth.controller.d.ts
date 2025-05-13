import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(LoginUserDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
