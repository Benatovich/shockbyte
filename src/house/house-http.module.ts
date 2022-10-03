import { Module } from '@nestjs/common';
import { HouseModule } from './house.module';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';

@Module({
    imports: [HouseModule],
    providers: [HouseService],
    controllers: [HouseController]
})

export class HouseHttpModule {}