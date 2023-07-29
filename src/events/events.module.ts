import { Module } from '@nestjs/common';
import { AxiosModule } from 'src/axios/axios.module';

import { EventController } from './events.controller';
import { AppService } from './events.service';

@Module({
  imports: [AxiosModule],
  controllers: [EventController],
  providers: [AppService],
})
export class EventsModule {}
