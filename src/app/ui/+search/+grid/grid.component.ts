import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { HeaderService } from 'src/app/core/services/header.service';
import { Subscription } from 'rxjs';
import { HttpMonitoringService } from 'src/app/core/services/htto-monitoring.service';
import { map } from 'rxjs/operators';

declare let AOS: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit, OnDestroy {

  isFiltersOpen = false;
  searchResults$ = this._searchService.searchResults$;
  hasRequests$: Subscription;
  hasRequests = false;

  constructor(private _searchService: SearchService,
    private _headerService: HeaderService,
    private _httpMonitoringService: HttpMonitoringService) { }

  ngOnInit() {
    this._headerService.hasBack(false);
    this._headerService.headerBackUrl('/tile');
    this.hasRequests$ = this._httpMonitoringService.activeConnections$.pipe(map(number => {
      this.hasRequests = (number > 0) ? true : false
    })).subscribe();
  }

  trackByFn(index, item: VacancySearchExtended) {
    return item.vacancyID; // or item.id
  }

  ngOnDestroy() {
    // this._searchService.clearResults();
  }



}
