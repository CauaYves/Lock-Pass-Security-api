import { Module } from '@nestjs/common'
import { CardsService } from './cards.service'
import { CardsController } from './cards.controller'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CardsRepository } from './cards.repository'

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  imports: [JwtModule, UsersModule, PrismaModule],
})
export class CardsModule {}
