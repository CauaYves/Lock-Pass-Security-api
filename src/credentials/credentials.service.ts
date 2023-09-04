import Cryptr = require("cryptr")
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { CredentialsRepository } from './credentials.repository'
import { CreateCredentialDto } from './dto/create-credential.dto'
import { CredentialDto } from './dto/get-credential.dto'

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
  ) {}

  private readonly cryptr = new Cryptr(process.env.CRYPT)
  async createCredential(createCredentialDto: CreateCredentialDto) {
    const { title, site, username, password, userId } = createCredentialDto

    const existingCredential = await this.credentialsRepository.isTitleUniqueForUser(title, userId)

    if (existingCredential) throw new ConflictException('Title already in use!')

    const encryptedPassword = this.cryptr.encrypt(password)

    return this.credentialsRepository.createCredential({
      title,
      site,
      username,
      password: encryptedPassword,
      userId,
    })
  }

  async getAllCredentials(userId: number) {
    const credentials = await this.credentialsRepository.findAllByUserId(userId)
    return credentials.map((credential) => this.mapToCredentialDto(credential))
  }

  async getCredentialById(id: number, userId: number) {
    const credential = await this.credentialsRepository.findByIdAndUserId(id, userId)
    if (!credential) throw new NotFoundException('Credential not found!')
  
    return this.mapToCredentialDto(credential)
  }
  async deleteCredential(id: number, userId: number) {
  const credential = await this.credentialsRepository.findByIdAndUserId(id, userId)
  if (!credential) throw new NotFoundException('Credential not found!')
  await this.credentialsRepository.deleteCredential(id)
}
  private mapToCredentialDto(credential: any): CredentialDto {
      const decryptedPassword = this.cryptr.decrypt(credential.password)

      return {
        id: credential.id,
        title: credential.title,
        site: credential.site,
        username: credential.username,
        password: decryptedPassword,
        userId: credential.userId,
      }
    }

}