import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HouseModule } from '../house/house.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [HouseModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
