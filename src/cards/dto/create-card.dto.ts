import { IsNotEmpty, IsString, IsInt, IsBoolean } from 'class-validator';
import { IsDateAsString } from './custom-validators';
import { ApiProperty } from '@nestjs/swagger';
    //MENSAGEM DE ERRO ENVIADA AO USUARIO DEVE SER EM PORTUGUÊS!

export class CreateCardDto {
  @ApiProperty({
    example: 'banco do brasil cartão'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  userId: number;

  @ApiProperty({
    example: 123347231120
  })
  @IsNotEmpty()
  @IsInt()
  cardNumber: number;

  @ApiProperty({
    example: 'Cauã Yves dos S Macedo'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '12/34'
  })
  @IsNotEmpty()
  @IsDateAsString() 
  expiry: string;

  @ApiProperty({
    example: '125'
  })
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({
    example: '847623'
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: true
  })
  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @ApiProperty({
    example: 'credit'
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}