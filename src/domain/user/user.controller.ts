import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '@domain/user/user.service';
import {
  UserByIdInterface,
  AddMoneyRequestInterface,
  ReferenceInterface,
  UserInterface,
} from '@domain/user/interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(data: UserByIdInterface): Promise<UserInterface> {
    return this.userService.findOne(data);
  }

  @GrpcMethod('UserService', 'AddMoney')
  addMoney(data: AddMoneyRequestInterface): Promise<ReferenceInterface> {
    return this.userService.addMoney(data);
  }
}
