import { Module } from '@nestjs/common'
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { NotesRepository } from './notes.repository'

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  imports: [JwtModule, UsersModule, PrismaModule],
})
export class NotesModule {}
