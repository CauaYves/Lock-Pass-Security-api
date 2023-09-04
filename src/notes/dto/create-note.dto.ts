import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
    //MENSAGEM DE ERRO ENVIADA AO USUARIO DEVE SER EM PORTUGUÊS!

export class CreateNoteDto {
  @ApiProperty({
    example: 'banco do brasil'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'palavras chaves para confirmação de usuário em apps por exemplo, data de aniversário, nome do cachorro ou acontecimento que só você sabe.'
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  userId: number;
}