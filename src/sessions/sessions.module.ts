import { Module } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { SessionsRepository } from './sessions.repository'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [SessionsService, SessionsRepository],
  imports: [PrismaModule],
  exports: [SessionsService],
})
export class SessionsModule {}
