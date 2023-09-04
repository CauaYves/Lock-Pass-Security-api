import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    })
  }

  async createSession(userId: number, token: string) {
    return await this.prisma.session.create({
      data: {
        userId,
        token,
      },
    })
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    })
  }
  async findUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: { id },
    })
  }

  async findOne(id: number) {
    return await this.prisma.session.findFirst({
      where: { userId: id },
    })
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async removeUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }
}