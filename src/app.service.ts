import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  getHealth(): string {
    return 'I’m okay!'
  }
  async validatePassword(id: number, password: string) {

    const userFounded = await this.usersService.searchById(id)

    if (!userFounded) {
      throw new UnauthorizedException('User not found!')
    }

    const isValidPassword = await bcrypt.compare(password, userFounded.password)

    if (!isValidPassword) {
      throw new UnauthorizedException('Credentials invalid!')
    }

    return userFounded
  }

  async eraseUserData (id: number) {
    return await this.usersService.removeUser(id)
  }
}
