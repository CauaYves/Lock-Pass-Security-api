import { Module } from '@nestjs/common'
import { CredentialsService } from './credentials.service'
import { CredentialsController } from './credentials.controller'
import { CredentialsRepository } from './credentials.repository'
import { UsersModule } from 'src/users/users.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository],
  imports: [JwtModule, UsersModule, PrismaModule],
})
export class CredentialsModule {}
