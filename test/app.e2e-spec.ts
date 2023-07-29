import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AvailableSeatsDto } from '../src/events/dto/available-seats.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get available seats', async () => {
    const availableSeats = await request(app.getHttpServer())
      .get('/events/1195/available-seats')
      .expect(200)
      .then((res) => {
        return res.body as AvailableSeatsDto[];
      });

    availableSeats.forEach((seat) => {
      expect(seat).toHaveProperty('section');
      expect(seat).toHaveProperty('row');
      expect(seat).toHaveProperty('seat');
      expect(seat).toHaveProperty('price');
      expect(seat.section).toEqual(expect.any(String));
      expect(seat.row).toEqual(expect.any(String));
      expect(seat.seat).toEqual(expect.any(Number));
      expect(seat.price).toEqual(expect.any(Number));
    });
  });
});
