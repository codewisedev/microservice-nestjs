import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@domain/user/user.service';
import { UserController } from '@domain/user/user.controller';
import { User } from '@domain/user/entity';
import { UserRepository } from '@domain/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
