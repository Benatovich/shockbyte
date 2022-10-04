import { Controller, Get, Post, Body, Patch, Param, Delete, Header, UnauthorizedException } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { v4 as uuid } from 'uuid';
// import { LocalAuthGuard } from '../auth/local-auth.guard';
// import { Response as Res} from 'express';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  // register a new birdhouse
  @Post()
  // figure out how to make dynamic header
  @Header('X-UBID', '<UBID>')
  create(@Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseService.create(createHouseDto);
  }

  // update number of birds/eggs at a given birdhouse
  // @UseGuards(LocalAuthGuard)
  @Post(':id/residency')
  // figure out how to make dynamic header
  @Header('X-UBID', '<UBID>')
  updateResidents(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto): Promise<House> {
    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.updateResidents(id, updateHouseDto);
    }
  }

  // get info about a birdhouse
  @Get(':id')
  // figure out how to make dynamic header
  @Header('X-UBID', '<UBID>')
  findOne(@Param('id') id: string = uuid()): Promise<House> {
    const response = this.houseService.authenticate(id);
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
  remove(@Param('id') id: string): Promise<void> {
    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.remove(id);
    }
  }

// update the name or location data for a birdhouse
  @Patch(':id')
  // figure out how to make dynamic header
  @Header('X-UBID', '<UBID>')
  update(@Param('id') id: string, @Body() createHouseDto: CreateHouseDto) {
    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.update(id, createHouseDto);
    }
  }
}
