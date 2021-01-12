import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SearchService } from './search.service';
import { map, switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { HeaderService } from 'src/app/core/services/header.service';
import { slideInAnimation } from 'src/app/core/animations';
import { LocationService } from './location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  animations: [
    slideInAnimation
  ]
})
export class SearchComponent implements OnInit, OnDestroy {

  sub: Subscription;
  counter = 0;
  outlet;
  menuVisibility = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private _headerService: HeaderService,
    private _locationService: LocationService,
    private _searchService: SearchService) { }

  ngOnInit() {
    this._headerService.updateHeaderName('Search Jobs');
    this.sub = this._activatedRoute.queryParams.pipe(
      map(resp => {
        let hasLocation = false;
        if (!!resp['lat'] && !!resp['lng']) {
          const lat = resp['lat'];
          const lng = resp['lng'];
          hasLocation = true;
          this._searchService.updateLatLngWithReverseGeoCode(lat, lng);
        }
        if (!!resp['keywords']) {
          const keywords = resp['keywords'];
          this._searchService.updateKeywords(keywords);
        }
        if (!!resp['vacancyId']) {
          const vacancyId = resp['vacancyId'];
          this._searchService.updateVacancyId(vacancyId);
        }
        if (!!resp['brandId']) {
          const brandId = resp['brandId'];
          const brandInt = parseInt(brandId);
          this._searchService.udpdateBrand(brandInt);
        }

        if (!!resp['radius']) {
          const radius = resp['radius'];
          const radiusInt = parseInt(radius);
          this._searchService.updateRadius(radiusInt);
        }

        if (!!resp['businessAreaId']) {
          const businessAreaId = resp['businessAreaId'];
          const businessAreaIdInt = parseInt(businessAreaId);
          this._searchService.updateBusinessArea(businessAreaIdInt);
        }
        if (hasLocation === false) {
          this._searchService.getUserGeoLocation().then(() => {
            this._searchService.search().toPromise();
          });
        } else {
          return this._searchService.search().toPromise();
        }

      }),
      take(1)
    ).subscribe();

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
