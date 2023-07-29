import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from 'src/axios/axios.service';

import { AvailableSeatsDto } from './dto/available-seats.dto';
import { PriceDto } from './dto/price.dto';
import { SeatDto } from './dto/seat.dto';
import { SectionDto } from './dto/section.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableSeats(eventId: string): Promise<AvailableSeatsDto[]> {
    const [seats, prices, sections] = await Promise.all([
      this.axiosService.get<SeatDto[]>(
        this.configService
          .get<string>('seatsUrl')
          .replace(/{eventId}/g, eventId),
      ),
      this.axiosService.get<PriceDto[]>(
        this.configService
          .get<string>('pricesUrl')
          .replace(/{eventId}/g, eventId),
      ),
      this.axiosService.get<SectionDto[]>(
        this.configService.get<string>('sectionsUrl'),
      ),
    ]);

    const availableSeats = this.buildAvailableSeats({
      seats,
      prices,
      sections,
    });

    return availableSeats;
  }

  private buildAvailableSeats({
    seats,
    prices,
    sections,
  }: {
    seats: SeatDto[];
    prices: PriceDto[];
    sections: SectionDto[];
  }) {
    const availableSeats: AvailableSeatsDto[] = [];
    const pricesMap = new Map<number, PriceDto>();
    const sectionsMap = new Map<number, SectionDto>();

    for (const price of prices) {
      if (price.PerformanceId !== 0) continue;
      pricesMap.set(price.ZoneId, price);
    }

    for (const section of sections) {
      sectionsMap.set(section.Id, section);
    }

    for (const seat of seats) {
      if (seat.SeatStatusId !== 0) continue;
      const price = pricesMap.get(seat.ZoneId);
      const section = sectionsMap.get(seat.SectionId);

      if (price) {
        availableSeats.push({
          section: section.Description,
          row: seat.SeatRow,
          seat: +seat.SeatNumber,
          price: price.Price,
        });
      }
    }

    return availableSeats;
  }
}
