import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.FindEmail(email);

    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

    return user;
  }

  async login(user) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    const session = await this.sessionsService.createSession(user.id, token);

    return {
      accessToken: token,
      sessionId: session.id,
    };
  }
}