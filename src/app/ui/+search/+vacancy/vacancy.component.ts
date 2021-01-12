import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { VacancyDtoRead, Vacancy, VacancyDescriptions } from 'src/app/core/interfaces/custom.interfaces';
import { SearchService } from '../search.service';
import { latLng, marker, Icon, IconOptions, Map, DivIcon } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { pipe, VirtualTimeScheduler } from 'rxjs';
import { mapOptions, iconOptions } from '../+map/map-item/map-item.setup';
import { Details, Quality } from 'src/app/core/interfaces/api.interfaces';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthenticationStorageService } from 'src/app/core/services/auth-storage.service';
import { VacancyModel, Description } from 'src/app/core/interfaces/vacancy-description.interfaces';
import { SavedJobsService } from '../saved-jobs.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyComponent implements OnInit, OnDestroy {

  map;
  center = latLng(46.879966, -121.726909);
  vacancy: VacancyModel;
  qualities: Quality[] = [];
  bannerPannel: string;
  descriptions: Description[] = [];
  videos: Description[] = [];
  options = mapOptions;
  icon: DivIcon = new DivIcon<IconOptions>(iconOptions);
  shareUrl = window.location.href.toString();
  jobPin;


  constructor(private _searchService: SearchService,
    private _headerService: HeaderService,
    private _savedService: SavedJobsService,
    private _router: Router,
    private _title: Title,
    private _activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    this._headerService.hasBack(true);


    window.scrollTo(0, 0);
    this._activatedRoute.params.pipe(switchMap(params => {
      const id = params['id'] as string;
      return this._searchService.vacancy(id).pipe(pipe(tap(resp => {
        this.vacancy = resp;
        this._title.setTitle(`Nexjob - ${this.vacancy.title} `);
        this.vacancy.isSaved = this._savedService.includes(this.vacancy.id);
        this.vacancy.logoUrl = this._searchService.getClientLogo(resp.clientId, resp.brandId)
        this.descriptions = resp.descriptions.filter(o => o.PanelType.Id === 1 || o.PanelType.id === 1);
        this.qualities = resp.qualities;
        this.videos = resp.descriptions.filter(o => o.PanelType.Id === 4 || o.PanelType.id === 4);

        const panels = resp.descriptions.filter(o => o.PanelType.Id === 9 || o.PanelType.id === 9).map(desc => {
          return this._searchService.bannerUrl(desc.Description);
        });

        if (!!panels) {
          this.bannerPannel = panels[0];
        } else {
          this.bannerPannel = this._searchService.bannerUrl('1');
        }

        if (!!resp.latitude && !!resp.longitude) {
          this.jobPin = marker([resp.latitude, resp.longitude], {
            icon: this.icon
          });
          if (!!this.map) {
            this.map.setZoom(12);
          }
          this.center = latLng(resp.latitude, resp.longitude);
        }

      })));
    })).subscribe();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.center = this.center;
    let scope$ = this;
    setTimeout(function () {
      if (!!scope$.map) {
        scope$.map.invalidateSize()
      }
    }, 1000);
  }

  onShare(url: string) {

    if ((<any>navigator).share) {
      (<any>navigator).share({
        title: 'Nexjob Share',
        url: url
      }).then(() => {


      })
    }
  }

  hasShare() {
    return (<any>navigator).share ? true : false;
  }

  closingSoon() {

    if (this.vacancy && !!this.vacancy.expiryDate) {
      let dt = new Date(this.vacancy.expiryDate);
      let cDt = new Date();
      const diff = dt.getTime() - cDt.getTime();
      var days = diff / (1000 * 3600 * 24);
      return days;
    }
    return null;
  }

  toggleSave() {
    this.vacancy.isSaved = !this.vacancy.isSaved;
    this._searchService.toogleSaveVacancy(this.vacancy.id, this.vacancy.isSaved).subscribe();
  }

  justadded() {
    if (!!this.vacancy?.liveDate) {
      let dt = new Date(this.vacancy.liveDate);
      let cDt = new Date();
      const diff = dt.getTime() - cDt.getTime();
      var days = diff / (1000 * 3600 * 24);
      return days;
    }
    return null;
  }

  goBack() {
    this._headerService.backUrl$.pipe(tap(url => {
      this._router.navigateByUrl(url)
    })).subscribe();
  }

  ngOnDestroy(): void {
    if (!!this.map) {
      this.map.off();
      this.map.remove();
      this.map = null;
    }
  }
}
