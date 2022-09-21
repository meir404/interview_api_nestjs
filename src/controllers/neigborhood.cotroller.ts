import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RequestFilterInterface } from '../interfaces/request-filter.interface';
import { SearchService } from '../services/search.service';
import { NeigborhoodInterface } from '../interfaces/neighborhood.interface';
import { JoiValidationPipe } from '../pipes/validation.pipe';
import { requestFilterSchema } from '../validators/request-filter.validator';

@Controller('neighborhood')
export class NeighborhoodController {
  constructor(private searchService: SearchService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(requestFilterSchema))
  findAll(
    @Body() requestData?: RequestFilterInterface,
  ): NeigborhoodInterface[] {
    return this.searchService.find(requestData);
  }
}
