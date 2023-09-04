import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private SALT = 10
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto

    const thisUserExists = await this.FindEmail(email)
    if (thisUserExists) throw new ConflictException('email already in use!')

    const hashedPass = await bcrypt.hash(password, this.SALT)
    const result = await this.userRepository.createUser({...createUserDto, password: hashedPass,})
    delete result.password
    return result
  }

  async createSession(userId: number, token: string) {
    return await this.userRepository.createSession(userId, token)
  }

  async FindEmail(email: string) {
    return await this.userRepository.findEmail(email)
  }
  async searchById(id: number) {
    return await this.userRepository.findUserById(id)
  }
  

  findAll() {
    return `Will return all users`
  }

  async findOne(id: number) {
    const existingUser = await this.userRepository.findOne(id)
    if (!existingUser) throw new NotFoundException('user not found!')

    return existingUser
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async removeUser(id: number) {
    return await this.userRepository.removeUser(id)
  }
}