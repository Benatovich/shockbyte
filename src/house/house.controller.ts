import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { v4 as uuid } from 'uuid';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseService.create(createHouseDto);
  }

  @Post(':id/residency')
  @HttpCode(201)
  updateHistory(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto): Promise<House> {
    return this.houseService.updateHistory(id, updateHouseDto);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string = uuid()): Promise<House> {
    return this.houseService.findOne(id);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<House[]> {
    return this.houseService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.houseService.remove(id);
  }


  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }
}
