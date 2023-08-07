import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaservice: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    return await this.prismaservice.user.update({
      where: {
        id: userId,
      },
      data: { ...dto },
    });
  }
}
