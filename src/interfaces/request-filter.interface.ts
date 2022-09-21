import { LocationPointInterface } from './location-point.interface';
import { FilterTypeEnum } from '../enums/filter-type.enum';

export interface FilterInterface {
  field: string;
  type?: FilterTypeEnum;
  value: string | FilterLocationInterface;
  operator:
    | 'eq'
    | 'neq'
    | 'gte'
    | 'gt'
    | 'lte'
    | 'lt'
    | 'isempty'
    | 'isnotempty'
    | 'startswith'
    | 'doesnotstartwith'
    | 'contains'
    | 'doesnotcontain'
    | 'endswith'
    | 'doesnotendwith';
}

export interface SortInterface {
  field: string;
  dir: 'asc' | 'desc';
}

export interface FilterLocationInterface extends LocationPointInterface {
  radius: number;
}

export interface RequestFilterInterface {
  filters: FilterInterface[];
  sort: SortInterface[];
}
