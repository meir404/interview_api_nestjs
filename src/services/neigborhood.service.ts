import { Injectable } from '@nestjs/common';
import { NeigborhoodInterface } from '../interfaces/neighborhood.interface';
import * as neighborhoods from '../../data/neighborhoods_data.json';

@Injectable()
export class NeigborhoodService {
  public data: NeigborhoodInterface[] = neighborhoods;
}
