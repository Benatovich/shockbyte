import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(id: string, ubid: string): Promise<any> {
        const house = await this.authService.validateHouse(id, ubid);
        if (!house) {
          throw new UnauthorizedException();
        }
        return house;
      }
    }