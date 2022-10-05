import { Injectable, Logger, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { v4 as uuid } from  'uuid';
import { validate } from 'class-validator';

@Injectable()
export class HouseService {
  private readonly logger = new Logger(HouseService.name)

  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    let today = new Date();

    const house = new House();
    house.latitude = createHouseDto.latitude;
    house.longitude = createHouseDto.longitude;
    house.name = createHouseDto.name;
    house.lastUpdated = today;



    const errors = await validate(house)
    if(errors.length > 0) {
      throw new Error('Invalid birdhouse')
    } else {
      this.logger.log(`Registered a new birdhouse on ${today}`)
      return this.houseRepository.save(house);
    }
  }

  async findAll(): Promise<House[]> {
    this.logger.log('Retrieved data for all birdhouses')
    return this.houseRepository.find();
  }
  
  async findOne(id: string = uuid()): Promise<House> {
    const response = await this.houseRepository.findOneBy({ id: id });
    delete response.id;
    delete response.ubid;

    this.logger.log('Retrieved data for a single birdhouse')
    return response;
  }
  
  async remove(id: string): Promise<void> {
    this.logger.log('Removed a birdhouse from the database')
    await this.houseRepository.delete(id);
  }
  
  async update(id: string, createHouseDto: CreateHouseDto): Promise<House> {
    let today = new Date();
    let toUpdate = await this.houseRepository.findOneBy({ id: id });
    
    let updated = Object.assign(toUpdate, createHouseDto);
    updated.lastUpdated = today;
    
    const response = await this.houseRepository.save(updated);
    delete response.id;
    delete response.ubid;
    
    this.logger.log(`Updated name and/or location data for birdhouse id: ${id} on ${today}`)
    return response;
  }

  async updateResidents(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
    let today = new Date();
    let toUpdate = await this.houseRepository.findOneBy({ id: id });

    let updated = Object.assign(toUpdate, updateHouseDto);
    updated.lastUpdated = today;
    
    const response = await this.houseRepository.save(updated);
    delete response.id;
    delete response.ubid;
    
    this.logger.log(`Updated bird and/or egg data for birdhouse id: ${id} on ${today}`)
    this.logger.log(`There are now ${updateHouseDto.birds} birds and ${updateHouseDto.eggs} eggs`)

    return response;
  }

  // async authenticate(id: string): Promise<House | null> {
  //   const house = await this.houseRepository.findOneBy({ id: id });
  //   if (house && house.ubid != null) {
  //     return house;
  //   }
  //   return null;
  // }

  async getUbid(id: string): Promise<string> {
    const house = await this.houseRepository.findOneBy({ id: id });
    if (house.ubid) {
      return house.ubid;
    }
    return null;
  }

  async authenticate(ubid: string = uuid()): Promise<House | null> {
    const house = await this.houseRepository.findOneBy({ ubid: ubid });
    if (house) {
      return house
    }
    return null;
  }
}
