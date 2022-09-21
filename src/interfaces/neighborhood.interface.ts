import { LocationPointInterface } from './location-point.interface';

export interface NeigborhoodInterface extends LocationPointInterface {
  neigborhood: string;
  state?: string;
  city: string;
  'average age': number;
  'distance from city center': number;
  'average income': number;
  'public transport availability': string;
}
