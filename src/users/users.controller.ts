import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('endpoints')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto)
    return { message: 'Conta criada com sucesso!', user }
  }

  @Post('login')
  async loginUser(@Body() { email, password }: { email: string; password: string }) { // refatorar para fazer Dto
    if (!email || !password) {
      throw new HttpException('Requisição inválida. Email e senha são obrigatórios.', HttpStatus.BAD_REQUEST)
    }

    const user = await this.authService.validateUser(email, password)
    const { accessToken } = await this.authService.login(user)
    return { accessToken }
  }
}