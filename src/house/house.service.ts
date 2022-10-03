import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { v4 as uuid } from  'uuid';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  create(createHouseDto: CreateHouseDto): Promise<House> {
    const house = new House();
    house.latitude = createHouseDto.latitude;
    house.longitude = createHouseDto.longitude;
    house.name = createHouseDto.name;

    return this.houseRepository.save(house);
    // return 'This action adds a new house';
  }

  async findAll(): Promise<House[]> {
    return this.houseRepository.find();
    // return `This action returns all house`;
  }
  
  findOne(id: string = uuid()): Promise<House> {
    return this.houseRepository.findOneBy({ id: id });
    // return `This action returns a #${id} house`;
  }
  
  async remove(id: string): Promise<void> {
    await this.houseRepository.delete(id);
    // return `This action removes a #${id} house`;
  }
  
  async update(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
    let toUpdate = await this.houseRepository.findOneBy({ id: id });
    let updated = Object.assign(toUpdate, updateHouseDto);
    
    return await this.houseRepository.save(updated);

    // return `This action updates a #${id} house`;
  }
}
