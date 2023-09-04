import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';
    //MENSAGEM DE ERRO ENVIADA AO USUARIO DEVE SER EM PORTUGUÊS!
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
  example: 'cauayves5@gmail.com',
  description: 'deve ser igual ao email usado no cadastro'
})
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'A senha deve conter pelo menos 10 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial.',
  })
  password: string;
}