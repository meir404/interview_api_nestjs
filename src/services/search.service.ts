import { Injectable } from '@nestjs/common';
import {
  FilterLocationInterface,
  RequestFilterInterface,
} from '../interfaces/request-filter.interface';
import { NeigborhoodService } from './neigborhood.service';
import orderBy = require('lodash.orderby');
import { LocationService } from './location.service';
import { LocationPointInterface } from '../interfaces/location-point.interface';
import { FilterTypeEnum } from '../enums/filter-type.enum';

@Injectable()
export class SearchService {
  constructor(
    private dataService: NeigborhoodService,
    private locationService: LocationService,
  ) {}

  public find(rqFilter: RequestFilterInterface): any {
    const result = this.dataService.data.filter((neigborhood) =>
      rqFilter.filters.every((filter) => {
        if (filter.type === FilterTypeEnum.location) {
          return this.filter(
            this.locationService.getDistance(
              neigborhood as LocationPointInterface,
              filter.value as LocationPointInterface,
            ),
            filter.operator,
            (filter.value as FilterLocationInterface).radius,
          );
        } else {
          return this.filter(
            neigborhood[filter.field],
            filter.operator,
            filter.value as string,
          );
        }
      }),
    );
    return rqFilter.sort
      ? orderBy(
          result,
          rqFilter.sort.map((s) => s.field),
          rqFilter.sort.map((s) => s.dir ?? 'asc'),
        )
      : result;
  }

  private filter(
    filedValue: string | number,
    op: string,
    value: string | number,
  ) {
    switch (op) {
      case 'eq':
        return filedValue === value;
      case 'neq':
        return filedValue !== value;
      case 'gte':
        return filedValue >= value;
      case 'gt':
        return filedValue > value;
      case 'lte':
        return filedValue <= value;
      case 'lt':
        return filedValue < value;
      case 'isempty':
        return filedValue === '';
      case 'isnotempty':
        return filedValue !== '';
      case 'startswith':
        return (filedValue as string).startsWith(value as string);
      case 'doesnotstartwith':
        return !(filedValue as string).startsWith(value as string);
      case 'contains':
        return (filedValue as string).includes(value as string);
      case 'doesnotcontain':
        return !(filedValue as string).includes(value as string);
      case 'endswith':
        return (filedValue as string).endsWith(value as string);
      case 'doesnotendwith':
        return !(filedValue as string).endsWith(value as string);
      default:
        return false;
    }
  }
}
