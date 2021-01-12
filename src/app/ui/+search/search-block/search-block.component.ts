import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IOption } from 'src/app/core/interfaces/custom.interfaces';
import { SearchService } from '../search.service';
import { FormControl } from '@angular/forms';
import { Subscription, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, filter, tap, map, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpMonitoringService } from 'src/app/core/services/htto-monitoring.service';
import { LocationIQ } from 'src/app/core/interfaces/map.interfaces';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html'
})
export class SearchBlockComponent implements OnInit, OnDestroy {

  @Output() onFiltersChange = new EventEmitter<boolean>();

  @ViewChild('button', { static: true }) button: ElementRef;
  @Input() isMapView = false;
  controlSubscription: Subscription;
  locationName = new FormControl('');
  sortControl = new FormControl('Distance');
  keywords = new FormControl('');
  radiusControl = new FormControl(5);
  brand = new FormControl(null);
  businessArea = new FormControl(null);
  favouritesOnly = new FormControl(false);
  locationList$ = new BehaviorSubject<LocationIQ[]>([]);
  isFavOpen = false;
  menuVisibility = false;


  resultCount$ = this._searchService.searchResults$.pipe(map(results => {
    return results.length;
  }))

  brands$ = this._searchService.brandLookup$;
  businessAreas$ = this._searchService.businessAreaLookups$;
  radiusLookup = this._searchService.radius;
  AllJobCount$ = this._searchService.AllJobCount$;
  hasRequests$ = this._httpMonitoringService.activeConnections$;
  favouritesFilter$ = this._searchService.favouritesFilter$;

  constructor(private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _httpMonitoringService: HttpMonitoringService,
    private router: Router) { }

  ngOnInit() {
    this._searchService.favouritesFilter$.pipe(map(val => {
      this.isFavOpen = val;
    }), take(1)).subscribe();

    this.controlSubscription = this._searchService.locationName$.subscribe(name => {
      this.locationName.setValue(name, { emitEvent: false });
    });

    this.controlSubscription.add(this.sortControl.valueChanges.pipe(switchMap(val => {
      this._searchService.updateSort(val);
      return this._searchService.search().pipe(take(1));
    })).subscribe());

    this.controlSubscription.add(this._searchService.radius$.subscribe(radius => {
      this.radiusControl.setValue(radius, { emitEvent: false });
    }))

    this.controlSubscription.add(this._searchService.keywords$.subscribe(name => {
      this.keywords.setValue(name, { emitEvent: true });
    }));

    this.controlSubscription.add(this._searchService.favouritesFilter$.subscribe(isFav => {
      this.favouritesOnly.setValue(isFav, { emitEvent: false });
    }));

    this.controlSubscription.add(this._searchService.businessAreas$.subscribe(bussinessArea => {
      this.businessArea.setValue(bussinessArea, { emitEvent: false });
    }))


    this.controlSubscription.add(this.locationName.valueChanges.pipe(
      debounceTime(500),
      filter(v => !!v && (<string>v).length > 3),
      distinctUntilChanged(),
      exhaustMap(val => {

        // check to see if its in the array, if so update else search
        return this.locationList$.pipe(
          exhaustMap(locations => {
            if (locations.length > 0) {

              const match = locations.find(p => p.display_name === val);
              if (!!match) {
                this._searchService.updateLatLng(match.lat, match.lon);
                const queryParams: Params = {
                  lat: match.lat,
                  lng: match.lon
                };
                this.locationList$.next([]);
                this.router.navigate(
                  [],
                  {
                    relativeTo: this._activatedRoute,
                    queryParams: queryParams,
                    queryParamsHandling: 'merge', // remove to replace all query params by provided
                  });
                return of([]);
              }
            }

            return this._searchService.locationService.locationLookup(val).pipe(tap(resp => {
              if (!!resp && resp.length > 0) {
                this.locationList$.next(resp);
              }
            }));
          }), take(1));
      })
    ).subscribe());


    this.controlSubscription.add(this.keywords.valueChanges.pipe(
      distinctUntilChanged(),
      map(val => {
        const queryParams: Params = { keywords: val };
        this.router.navigate(
          [],
          {
            relativeTo: this._activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });

        this._searchService.updateKeywords(val);
      })
    ).subscribe());

    this.controlSubscription.add(this.radiusControl.valueChanges.pipe(
      distinctUntilChanged(),
      map(val => {
        const queryParams: Params = { radius: val };
        this.router.navigate(
          [],
          {
            relativeTo: this._activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });

        this._searchService.updateRadius(val);
      })
    ).subscribe());
  }

  onToggle() {
    this.isFavOpen = !this.isFavOpen;
    this.onFiltersChange.emit(this.isFavOpen);
  }

  onSearch() {
    this.menuVisibility = false;
    this._searchService.search().pipe(take(1)).subscribe();
  }

  toggleFav() {
    this.isFavOpen = !this.isFavOpen;
    this._searchService.updateFav(this.isFavOpen);
    this._searchService.search().pipe(take(1)).subscribe();
  }

  onGetUserLocation() {
    this._searchService.getUserGeoLocation();
  }

  updateMenuVisibility() {
    this.menuVisibility = !this.menuVisibility;
    this.onFiltersChange.emit(this.menuVisibility);
  }

  setLocation(location: any) {
    console.log(location);

  }


  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }

  // toggleFav() {
  //   const val = this.favouritesOnly.value;
  //   this.favouritesOnly.setValue(!val);
  //   this._searchService.updateFav(!val);

  // }

}
