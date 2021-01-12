import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'src/app/core/interfaces/custom.interfaces';
import { ConfigService } from 'src/app/core/config/config.service';
import { LocationIQ } from 'src/app/core/interfaces/map.interfaces';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LocationService {

  constructor(
    private _configService: ConfigService,
    private _http: HttpClient) { }

  reverseGeocode(model: LatLng) {
    return this._http.get<LocationIQ>(this._configService.reverseGeocoding(model.lat, model.lng));
  }

  reverseGeocodeFetch(model: LatLng) {
    return fetch(this._configService.reverseGeocoding(model.lat, model.lng)).then(resp => resp.json() as LocationIQ)
  }

  locationLookup(q: string) {
    return this._http.get<LocationIQ[]>(this._configService.locationLookup(q)).pipe(catchError((err => {
      return of(null as LocationIQ[]);
    })));
  }

  postcodeLookup(q: string){
    return this._http.get<LocationIQ[]>(this._configService.postcodeLookup(q)).pipe(catchError((err => {
      return of(null as LocationIQ[]);
    })));
  }

  locationLookupFetch(q: string) {
    return fetch(this._configService.locationLookup(q)).then(resp => resp.json())
  }


}
