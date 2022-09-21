import { Module, Scope } from '@nestjs/common';
import { NeighborhoodController } from './controllers/neigborhood.cotroller';
import { NeigborhoodService } from './services/neigborhood.service';
import { SearchService } from './services/search.service';
import { LocationService } from './services/location.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

@Module({
  imports: [],
  controllers: [NeighborhoodController],
  providers: [
    NeigborhoodService,
    SearchService,
    LocationService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {}
