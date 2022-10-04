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
    const house = new House();
    house.latitude = createHouseDto.latitude;
    house.longitude = createHouseDto.longitude;
    house.name = createHouseDto.name;

    const errors = await validate(house)
    if(errors.length > 0) {
      throw new Error('Invalid birdhouse')
    } else {
      this.logger.log('Registered a new birdhouse')
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
    let toUpdate = await this.houseRepository.findOneBy({ id: id });
    
    let updated = Object.assign(toUpdate, createHouseDto);
    
    const response = await this.houseRepository.save(updated);
    delete response.id;
    delete response.ubid;
    
    this.logger.log('Updated name and/or location data for a birdhouse')
    return response;
  }

  async updateResidents(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
    let toUpdate = await this.houseRepository.findOneBy({ id: id });

    let updated = Object.assign(toUpdate, updateHouseDto);
    
    const response = await this.houseRepository.save(updated);
    delete response.id;
    delete response.ubid;
    
    this.logger.log('Updated bird and/or egg data for a birdhouse')
    return response;
  }

  async authenticate(id: string): Promise<any> {
    const house = await this.houseRepository.findOneBy({ id: id });
    if (house && house.ubid != null) {
      return house;
    }
    return null;
  }

  async getUbid(id: string): Promise<string> {
    const house = await this.houseRepository.findOneBy({ id: id });
    if (house.ubid) {
      return house.ubid;
    }
    return null;
  }

}
