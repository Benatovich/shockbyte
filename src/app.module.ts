import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseModule } from './house/house.module';
import { House } from './house/entities/house.entity';

@Module({
  imports: [
    HouseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'salve0,hewer',
      // password: `${process.env.PASSWORD}`,
      database: 'postgres',
      entities: [House],
      synchronize: true,
    }),
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
