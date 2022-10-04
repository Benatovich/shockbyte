import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { House } from './entities/house.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  exports: [TypeOrmModule, HouseService],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
