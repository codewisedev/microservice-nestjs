import {
  BadRequestException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { UserController } from '@domain/user/user.controller';
import { FindUserRequest, AddMoneyRequest } from '@domain/user/request';

describe('Currency Rate E2E Test', () => {
  let app: INestApplication;
  const staticPath = `/${UserController.path}`;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Find user balance and return status code 200', async () => {
    const body: FindUserRequest = {
      user_id: 1,
    };

    const response = await request(app.getHttpServer())
      .get(staticPath)
      .send(body);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(typeof response.body.balance).toEqual('number');
  });

  it('Find user balance and error user not found', async () => {
    const body: FindUserRequest = {
      user_id: 2,
    };

    const response = await request(app.getHttpServer())
      .get(staticPath)
      .send(body);

    expect(response).toThrow(BadRequestException);
  });

  it('Add money to wallet and return status code 200', async () => {
    const body: AddMoneyRequest = {
      user_id: 1,
      amount: 50,
    };

    const response = await request(app.getHttpServer())
      .post(staticPath)
      .send(body);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(typeof response.body.reference_id).toEqual('string');
  });

  it('Add money to wallet and return error the transaction amount is greater than of wallet balance', async () => {
    const body: AddMoneyRequest = {
      user_id: 1,
      amount: -100,
    };

    const response = await request(app.getHttpServer())
      .post(staticPath)
      .send(body);

    expect(response).toThrow(BadRequestException);
  });

  it('Add money to wallet and return error user not found', async () => {
    const body: AddMoneyRequest = {
      user_id: 2,
      amount: 10,
    };

    const response = await request(app.getHttpServer())
      .post(staticPath)
      .send(body);

    expect(response).toThrow(BadRequestException);
  });
});
