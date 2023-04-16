import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '@common/config';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from '@domain/user/entity';
import { Wallet } from '@domain/wallet/entity';
import { Transaction } from '@domain/transaction/entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Config.mySql.host,
      port: Config.mySql.port,
      username: Config.mySql.username,
      password: Config.mySql.password,
      database: Config.mySql.database,
      entities: [User, Wallet, Transaction],
      synchronize: true,
    }),
    DomainModule,
  ],
})
export class AppModule {}
