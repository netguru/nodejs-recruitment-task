/* eslint-disable */
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export default class HealthController {
  constructor() {}

  @Get()
  async health() {
    return;
  }
}
