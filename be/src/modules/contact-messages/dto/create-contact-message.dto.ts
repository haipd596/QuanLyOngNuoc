import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName!: string;

  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @ApiProperty({ example: '0901234567' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  phone!: string;

  @ApiProperty({ example: 'Toi can tu van ve san pham ong nuoc.' })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message!: string;

  @ApiPropertyOptional({ example: 'NEW' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  status?: string;

  @ApiPropertyOptional({ example: 'Khach can lien he truoc 15h.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
