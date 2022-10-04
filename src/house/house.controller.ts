import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers, UnauthorizedException, Req, Res, ParseUUIDPipe, UseGuards, Request } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { TestHeaderDto } from '../app.dto';
import { v4 as uuid } from 'uuid';
import { RequestHeaders } from '../request-headers.decorator';
// import { LocalAuthGuard } from '../auth/local-auth.guard';
// import { Response as Res} from 'express';

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
  // @UseGuards(LocalAuthGuard)
  @Post(':id/residency')
  // @Header('content-type', 'application/json')
  updateResidents(
    @Param('id', ParseUUIDPipe) id: string, 
    @RequestHeaders() headers: TestHeaderDto,
    // @Req() req,
    // @Headers() header: Record<string>,
    @Body() updateHouseDto: UpdateHouseDto): Promise<House> {
      // req.header("X-UBID", this.houseService.getUbid(id));
      // res.end();

      console.log({ headers })

    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.updateResidents(id, updateHouseDto);
    }
  }

  // get info about a birdhouse
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string = uuid()): Promise<House> {
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
  remove(
    @Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.remove(id);
    }
  }

// update the name or location data for a birdhouse
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, @Body() createHouseDto: CreateHouseDto) {
    const response = this.houseService.authenticate(id);
    if(!response) {
      throw new UnauthorizedException();
    } else {
      return this.houseService.update(id, createHouseDto);
    }
  }
}
