import { Controller, Post, Body, Get, Param, UseGuards, ValidationPipe, Request, NotFoundException, ForbiddenException, Delete, ParseIntPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CredentialsService } from './credentials.service'
import { CreateCredentialDto } from './dto/create-credential.dto'
import { CredentialDto } from './dto/get-credential.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('endpoints')
@Controller('credentials')
@UseGuards(AuthGuard('jwt'))
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async createCredential(
    @Body(ValidationPipe) createCredentialDto: CreateCredentialDto,
    @Request() req,
    ) {
      const userId = req.user.id
      createCredentialDto.userId = userId
    return this.credentialsService.createCredential(createCredentialDto)
  }
@Get()
  async getAllCredentials(@Request() req) {
    const userId = req.user.id
    const credentials = await this.credentialsService.getAllCredentials(userId)

    return credentials
  }

  @Get(':id')
  async getCredentialById(
    @Param('id') id: number,
    @Request() req,
  ) {
    const userId = req.user.id

    const credential = await this.credentialsService.getCredentialById(id, userId)

    if (!credential) throw new NotFoundException('not found credential!')

    if (credential.userId !== userId) throw new ForbiddenException('Você não tem permissão para acessar esta credencial')

    return credential
  }
  @Delete(':id')
  async deleteCredential(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    const userId = req.user.id
    await this.credentialsService.deleteCredential(id, userId)
  }
}