import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers, UnauthorizedException, Req, Res, ParseUUIDPipe } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { v4 as uuid } from 'uuid';
import { RequestHeaders } from '../request-headers.decorator';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  // register a new birdhouse
  @Post()
  create(
    @Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseService.create(createHouseDto);
  }

  // update number of birds/eggs at a given birdhouse
  @Post(':id/residency')
  async updateResidents(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateHouseDto: UpdateHouseDto): Promise<House> {
      const ubid = await this.houseService.getUbid(id);
      const response = this.houseService.authenticate(ubid);

    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.updateResidents(id, updateHouseDto);
    }
  }

  // get info about a birdhouse
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string = uuid()): Promise<House> {
      const ubid = await this.houseService.getUbid(id);
      const response = this.houseService.authenticate(ubid);

    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.findOne(id);
    }
  }

  // get info about all birdhouses
  @Get()
  findAll(): Promise<House[]> {
    return this.houseService.findAll();
  }

  // remove a birdhouse
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string): Promise<void> {
      const ubid = await this.houseService.getUbid(id);
      const response = this.houseService.authenticate(ubid);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.remove(id);
    }
  }

// update the name or location data for a birdhouse
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, @Body() createHouseDto: CreateHouseDto) {
      const ubid = await this.houseService.getUbid(id);
      const response = this.houseService.authenticate(ubid);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.update(id, createHouseDto);
    }
  }
}
