import { Controller, Get, Query } from '@nestjs/common';
import { FiltersService } from './filters.service';
@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('data') data: any,
    @Query('page') page: string,
  ) {
    return await this.filtersService.findAll(search, data, +page);
  }
}
