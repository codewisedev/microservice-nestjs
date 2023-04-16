import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne() {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService', 'AddMoney')
  addMoney() {
    return this.userService.addMoney();
  }
}
