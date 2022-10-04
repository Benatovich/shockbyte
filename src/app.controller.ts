import { Controller, Post, Get, Res, Req, Request, Headers, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { RequestHeaders } from './request-headers.decorator';

import { TestHeaderDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post()
  public test(@Req() headers: TestHeaderDto) {
    // let header = req.header("header", "ubid");
    // req.end()
    // console.log(headers)
    console.log({ headers })
  }

  @Get()
  getHello(@RequestHeaders() headers: TestHeaderDto): string {
    console.log({ headers })
    return this.appService.getHello();
  }
}
