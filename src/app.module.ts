import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '@common/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Config.mySql.host,
      port: Config.mySql.port,
      username: Config.mySql.username,
      password: Config.mySql.password,
      database: Config.mySql.database,
      entities: [],
      synchronize: true,
    }),
    DomainModule,
  ],
})
export class AppModule {}
