import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AxiosModule } from './axios/axios.module';
import config from './config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AxiosModule,
    EventsModule,
  ],
})
export class AppModule {}
