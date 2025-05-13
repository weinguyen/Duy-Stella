import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly AdminRespository: Repository<Admin>,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.AdminRespository.findOneBy({ username });

    if (!admin) {
      throw new UnauthorizedException('Khong tim thay admin');
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Mat khau khong dung');
    }
    const payload = {
      admin: admin.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
