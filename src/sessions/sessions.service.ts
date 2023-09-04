import { Injectable } from '@nestjs/common'
import { SessionsRepository } from './sessions.repository'

@Injectable()
export class SessionsService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async createSession(userId: number, token: string) {
    return this.sessionsRepository.createSession(userId, token)
  }

  async findSessionById(id: number) {
    return this.sessionsRepository.findSessionById(id)
  }
}