import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
