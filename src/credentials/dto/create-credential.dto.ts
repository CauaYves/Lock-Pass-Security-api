import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
    //MENSAGEM DE ERRO ENVIADA AO USUARIO DEVE SER EM PORTUGUÊS!
export class CreateCredentialDto {
  
  @ApiProperty({
    example: 'Banco do brasil'
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    example: 'www.bancodobrasil.com.br'
  })
  @IsString()
  @IsNotEmpty()
  site: string

  @ApiProperty({
    example: 'Cauã Yves'
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'Password10!'
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: 1
  })
  userId: number
}