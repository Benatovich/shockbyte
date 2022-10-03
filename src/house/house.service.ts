import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

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

  findAll(): Promise<House[]> {
    return this.houseRepository.find();
    // return `This action returns all house`;
  }
  
  findOne(id: string): Promise<House> {
    return this.houseRepository.findOneBy({ id });
    // return `This action returns a #${id} house`;
  }
  
  async remove(id: string): Promise<void> {
    await this.houseRepository.delete(id);
    // return `This action removes a #${id} house`;
  }
  
  update(id: string, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }
}
