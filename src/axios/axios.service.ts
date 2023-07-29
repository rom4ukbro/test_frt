import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async get<TBody>(url: string): Promise<TBody> {
    const response = await lastValueFrom(this.httpService.get<TBody>(url));
    return response.data;
  }
}
