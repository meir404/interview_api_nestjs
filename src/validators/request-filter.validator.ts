import * as Joi from 'joi';
import {
  FilterInterface,
  RequestFilterInterface,
  SortInterface,
} from '../interfaces/request-filter.interface';

export const filterSchema = Joi.object<FilterInterface>({
  field: Joi.string(),
  type: Joi.string(),
  operator: Joi.string()
    .valid(
      'eq',
      'neq',
      'gte',
      'gt',
      'lte',
      'lt',
      'isempty',
      'isnotempty',
      'startswith',
      'doesnotstartwith',
      'contains',
      'doesnotcontain',
      'endswith',
      'doesnotendwith',
    )
    .required(),
  value: Joi.required(),
});
export const sortSchema = Joi.object<SortInterface>({
  field: Joi.string().required(),
  dir: Joi.string().valid('asc', 'desc'),
});
export const requestFilterSchema = Joi.object<RequestFilterInterface>({
  filters: Joi.array().items(filterSchema).required(),
  sort: Joi.array().items(sortSchema),
});
