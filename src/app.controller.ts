import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InfluxDbService } from './influxdb';
import fetch from 'node-fetch';

@Controller()
export class AppController {
  constructor(private readonly influxService: InfluxDbService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('results')
  async getResults(): Promise<any> {
    const results = await this.influxService.query(`
select * from data_result;
`);

    const group = results.groups()[0];

    return JSON.stringify(group.rows);
  }

  @Get('results/:id')
  async getResultsById(@Param('id') id: string): Promise<any> {
    const results = await this.influxService.query(`
select * from data_result;
`);

    const group = results.groups()[0];

    return JSON.stringify(
      group.rows.filter((row: any) => row.result_id === id),
    );
  }

  @Post('results')
  async postRequest(@Body() message: { request: string }): Promise<any> {
    await fetch('http://seosp.ru:65000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.parse(message.request)),
    });
    return 'success';
  }
}
