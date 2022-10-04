import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { HouseService } from '../house/house.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private houseService: HouseService) {}

  async validateBirdhouse(id: string = uuid(), ubid: string): Promise<any> {
    const house = await this.houseService.findOne(id);
    if (house && house.ubid === ubid) {
      const { ubid, ...result } = house;
      return result;
    }
    return null;
  }
}