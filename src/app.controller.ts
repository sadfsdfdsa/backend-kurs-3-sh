import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InfluxDbService } from './influxdb';

@Controller()
export class AppController {
  constructor(private readonly influxService: InfluxDbService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test')
  async getTest(): Promise<any> {
    const results = await this.influxService.query(`
    select MEAN(*) from traffic WHERE time > now() - 1d GROUP BY time(10m);
`);

    return 'success';
  }
}
