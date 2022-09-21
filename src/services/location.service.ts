import { Injectable } from '@nestjs/common';

import { LocationPointInterface } from '../interfaces/location-point.interface';

@Injectable()
export class LocationService {
  // https://www.geodatasource.com/developers/javascript
  getDistance(
    point1: LocationPointInterface,
    point2: LocationPointInterface,
  ): number {
    if (
      point1.latitude == point2.latitude &&
      point1.longitude == point2.longitude
    ) {
      return 0;
    }
    const radiusLat1 = (Math.PI * point1.longitude) / 180;
    const radiusLat2 = (Math.PI * point2.latitude) / 180;
    const theta = point1.longitude - point2.longitude;
    const radiusTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radiusLat1) * Math.sin(radiusLat2) +
      Math.cos(radiusLat1) * Math.cos(radiusLat2) * Math.cos(radiusTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344;
  }
}
