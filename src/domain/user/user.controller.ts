import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Post,
  HttpCode,
  Param,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { UserService } from '@domain/user/user.service';
import {
  UserByIdInterface,
  AddMoneyRequestInterface,
  ReferenceInterface,
  UserInterface,
} from '@domain/user/interface';
import { FormatResponseInterceptor } from '@common/interceptor/format-response.interceptor';
import { DocumentGenerator } from '@common/decorator/document-generator.decorator';
import { TransformPlainToInstance } from 'class-transformer';
import { AddMoneyResponse, FindUserResponse } from '@domain/user/response';
import { AddMoneyRequest } from './request';
import { TransactionLoggerInterceptor } from '@common/interceptor/transaction-logger.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(UserController.path)
export class UserController {
  static path = 'user';
  constructor(private userService: UserService) {}

  /**
   * GET /user
   *
   * Compatibility 1.0.0
   *
   * Summary: Return user wallet balance
   *
   * Description: Return user wallet balance with http status code 200
   */
  @Get()
  @DocumentGenerator({
    summary: 'Return user wallet balance',
    description: 'Return user wallet balance with http status code 200',
    200: FindUserResponse,
  })
  @HttpCode(HttpStatus.OK)
  @TransformPlainToInstance(FindUserResponse)
  async findUserBalance(
    @Param('user_id') user_id: number,
  ): Promise<FindUserResponse> {
    return this.userService.findOne(user_id);
  }

  /* `@GrpcMethod('UserService', 'FindOne')` is a decorator from the `@nestjs/microservices` package
  that marks the `findOne` method as a gRPC method. It specifies the service name (`UserService`)
  and the method name (`FindOne`) that this method corresponds to. This method takes in a
  `UserByIdInterface` object as a parameter and returns a `Promise` that resolves to a
  `UserInterface` object. It calls the `findOne` method of the `userService` instance with the
  `UserByIdInterface` object as an argument to retrieve a user with the specified ID. */
  @MessagePattern({ balance: 0 })
  @GrpcMethod('UserService', 'FindOne')
  findUserBalanceGrpc(data: UserByIdInterface): Promise<UserInterface> {
    return this.userService.findOne(data.id);
  }

  /**
   * POST /user
   *
   * Compatibility 1.0.0
   *
   * Summary: Return transaction reference id
   *
   * Description: Return transaction reference id with http status code 200
   */
  @Post()
  @DocumentGenerator({
    summary: 'Return transaction reference id',
    description: 'Return transaction reference id with http status code 200',
    200: AddMoneyResponse,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransactionLoggerInterceptor)
  @TransformPlainToInstance(AddMoneyResponse)
  async findAll(
    @Body() addMoneyRequest: AddMoneyRequest,
  ): Promise<AddMoneyResponse> {
    return this.userService.addMoney(
      addMoneyRequest.user_id,
      addMoneyRequest.amount,
    );
  }

  /* `@GrpcMethod('UserService', 'AddMoney')` is a decorator from the `@nestjs/microservices` package
  that marks the `addMoney` method as a gRPC method. It specifies the service name (`UserService`)
  and the method name (`AddMoney`) that this method corresponds to. */
  @MessagePattern({ reference_id: '123456' })
  @GrpcMethod('UserService', 'AddMoney')
  addMoney(data: AddMoneyRequestInterface): Promise<ReferenceInterface> {
    return this.userService.addMoney(data.id, data.amount);
  }
}
