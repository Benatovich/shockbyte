import { Controller, Post, Get, Res, Req, Headers, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestHeaders } from './request-headers.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public test() {
    // let header = req.header("header", "ubid");
    // req.end()
    // console.log(headers)
    // console.log({ headers })
  }

  @Get()
  getHello(): string {
    // console.log({ headers })
    return this.appService.getHello();
  }
}
