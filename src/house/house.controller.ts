import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { v4 as uuid } from 'uuid';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseService.create(createHouseDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string = uuid()): Promise<House> {
    return this.houseService.findOne(id);
  }

  @Get()
  findAll(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.houseService.remove(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }
}
