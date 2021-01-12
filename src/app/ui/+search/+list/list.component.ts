import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from '../search.service';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { HeaderService } from 'src/app/core/services/header.service';
import { Subscription } from 'rxjs';
import { HttpMonitoringService } from 'src/app/core/services/htto-monitoring.service';
import { map } from 'rxjs/operators';

declare let AOS: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  isFiltersOpen = false;
  hasRequests = true;
  //hasRequests$: Subscription;
  hasRequests$ = this._httpMonitoringService.activeConnections$
  searchResults$ = this._searchService.searchResults$;

  constructor(private _searchService: SearchService,
    private _headerService: HeaderService,
    private _httpMonitoringService: HttpMonitoringService) { }

  ngOnInit() {
    this._headerService.hasBack(false);
  
    // this.hasRequests$ = this._httpMonitoringService.activeConnections$.pipe(map(number => {
    //   this.hasRequests = (number > 0) ? true : false
    //   return this.hasRequests;
    // })).subscribe();
  }

  trackByFn(index, item: VacancySearchExtended) {
    return item.vacancyID; // or item.id
  }



  ngOnDestroy() {
    // this._searchService.clearResults();
  }



}
