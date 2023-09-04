import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate } from 'class-validator';

export class EncryptedCardDto {
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
  @IsString()
  cardNumber: string;

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
  @IsDate()
  expiry: Date;


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
    example: false
  })
  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @ApiProperty({
    example: 'debit'
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}