import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../search.service';
import { VacancySearch } from 'src/app/core/interfaces/api.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { HttpMonitoringService } from 'src/app/core/services/htto-monitoring.service';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

declare let AOS: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

  isFiltersOpen = false;
  currentActiveVacancy = '';
  currentActiveVacancyModel: VacancySearch;

  searchResults$ = this._searchService.searchResults$;
  searchArea$ = this._searchService.searchArea$;
  hasRequests$: Subscription;
  hasRequests = false;


  constructor(private _searchService: SearchService,
    private _headerService: HeaderService,
    private _httpMonitoringService: HttpMonitoringService,
    private _changeDetect: ChangeDetectorRef) { }

  ngOnInit() {
    this._headerService.hasBack(false);
    window.scrollTo(0,0);
    this.hasRequests$ = this._httpMonitoringService.activeConnections$.pipe(map(number => {
      this.hasRequests = (number > 0) ? true : false
    })).subscribe();
  }


  scrollToVacancy(id: string) {
    const className = `.vacancy_id_${id}`;
    const el = document.querySelector(className);
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    this.currentActiveVacancy = id;
    this._changeDetect.detectChanges();
  }

  updateSelectedActiveVacancy(model: VacancySearchExtended) {
    this.currentActiveVacancy = model.id;
    this.currentActiveVacancyModel = model;
    this._changeDetect.detectChanges();
  }

  searchArea(){
    this._searchService.onSearchArea().pipe(take(1)).subscribe();
  }

  onScroll(e) {

    const mapList = document.querySelector('.map-search-list');
    const offsetTop = mapList.scrollTop;
    const items = document.querySelectorAll('.listing-block');
    const height = mapList.clientHeight;
    const scrollHeightTop = (height / 2) - 5;
    const scrollHeightBottom = (height / 2) + 5;

    const scrollHeightTopTop = (height / 2) - 200;
    const scrollHeightBottomBottom = (height / 2) + 200;

    items.forEach(item => {
      const val1 = (<any>item).offsetTop;
      const distanceFromTop = val1 - offsetTop;
      if (distanceFromTop < height && distanceFromTop > 0) {
 
        // centre block!
        if (distanceFromTop > scrollHeightTop && distanceFromTop < scrollHeightBottom) {
          item.classList.add('listing-block--middle')
        }
        // else if (distanceFromTop > scrollHeightTopTop && distanceFromTop < scrollHeightTop) {
        //    item.classList.add('listing-block--side');
        //   } else if (distanceFromTop > scrollHeightBottom && distanceFromTop < scrollHeightBottomBottom) {
        //    item.classList.add('listing-block--side');
        //   }
        else if (distanceFromTop > scrollHeightBottomBottom || distanceFromTop < scrollHeightTopTop) {
          item.classList.remove('listing-block--middle');
          item.classList.remove('listing-block--side')
        }



      }


    })
  }

}
