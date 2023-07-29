import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AvailableSeatsDto } from './dto/available-seats.dto';
import { AppService } from './events.service';

@ApiTags('Events')
@Controller('events/:eventId')
export class EventController {
  constructor(private readonly appService: AppService) {}

  @Get('available-seats')
  async getAvailableSeats(
    @Param('eventId') event: string,
  ): Promise<AvailableSeatsDto[]> {
    return this.appService.getAvailableSeats(event);
  }
}
