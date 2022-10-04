import { Injectable } from '@nestjs/common';
import { HouseService } from '../house/house.service';

@Injectable()
export class AuthService {
    constructor(private houseService: HouseService) {}

    async validateHouse(id: string, ubid: string): Promise<any> {
        const house = await this.houseService.findOne(id);
        if (house && house.ubid === ubid) {
          const { ubid, ...result } = house;
          return result;
        }
        return null;
      }
    }