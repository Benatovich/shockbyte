import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseModule } from './house/house.module';
import { House } from './house/entities/house.entity';
import { HouseHistory } from './house/entities/houseHistory.entity';
import { TypeOrmHistoryModule } from '@kittgen/nestjs-typeorm-history';
import { createConnection, Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HouseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      // password: `${process.env.PASSWORD}`,
      database: 'postgres',
      entities: [House, HouseHistory],
      synchronize: true,
    }),
    AuthModule,
    // TypeOrmHistoryModule.registerAsync({
    //   inject: [Connection],
    //   useFactory: (connection: Connection) => ({
    //     connection,
    //   })
    // })
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
