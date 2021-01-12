import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { mapOptions, iconOptions, iconOptionsUser } from './map-item.setup';
import { latLng, marker, Icon, IconOptions, Map, DivIcon } from 'leaflet';
import 'leaflet.markercluster'
import 'leaflet-draw';
import * as L from 'leaflet';
import { SearchService } from '../../search.service';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { LatLng, VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { VacancySearch } from 'src/app/core/interfaces/api.interfaces';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map-item',
  templateUrl: './map-item.component.html'
})
export class MapItemComponent implements OnInit, OnDestroy, OnChanges {

  map;
  center = latLng(46.879966, -121.726909);
  options = mapOptions;
  userLatLng;
  icon: Icon = new DivIcon<IconOptions>(iconOptions);
  userIcon = new DivIcon<IconOptions>(iconOptionsUser);

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() onScrollToVacancy = new EventEmitter<string>();
  @Input() scrollToVacancyByModel: VacancySearch;

  userPin$ = this._searchService.userLatLng$.pipe(
    filter(o => !!o),
    map(pin => {
      const queryParams: Params = { lat: pin.lat, lng: pin.lng };
      this.userLatLng = { lat: pin.lat, lng: pin.lng };
      this.router.navigate(
        [],
        {
          relativeTo: this._activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

      this.scrollToVacancy(null, { lat: pin.lat, lng: pin.lng });
      return marker([pin.lat, pin.lng], {
        icon: this.userIcon
      });
    }));



  mapResults$ = this._searchService.searchResults$.pipe(
    takeUntil(this.destroy$),
    map(vacancy => {
      let markers = (<any>L).markerClusterGroup({
        iconCreateFunction: function (cluster) {
          return L.divIcon({ html: '<div class="leaflet-marker" >' + cluster.getChildCount() + '</div>' });
        }
      });
      let scope = this;
      vacancy.map(o => {
        let m = marker([o.latitude, o.longitude], {
          icon: this.icon,
          id: o.id,
          latLng: [o.latitude, o.longitude],

        });

        m.on('click', function (e) {
          let id = e.sourceTarget.options.id as string;
          let latLng: LatLng;
          if (!!e.sourceTarget._preSpiderfyLatlng) {
            latLng = e.sourceTarget._preSpiderfyLatlng as LatLng;
          } else {
            latLng = e.sourceTarget._latlng;
          }

          scope.scrollToVacancy(id, latLng)
        });
        markers.addLayer(m);
        return m;
      });
      return markers;
    })
  );


  constructor(private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _changeRef: ChangeDetectorRef,
    private router: Router,) { }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
    let scope$ = this;
    let timerUpdate;
    this.map.on("moveend", function (event) {

      clearTimeout(timerUpdate);
      timerUpdate = setTimeout(() => {
        let center = scope$.map.getBounds().contains({ lat: scope$.userLatLng.lat, lng: scope$.userLatLng.lng });
        scope$._searchService.updateSearchArea({
          canSearch: center,
          lat: scope$.center.lat,
          lng: scope$.center.lng
        });
        scope$._changeRef.detectChanges();
      }, 100);

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['scrollToVacancyByModel']) {
      const model = changes['scrollToVacancyByModel'].currentValue as VacancySearchExtended;
      if (!!model) {
        this.scrollToVacancy(model.id, { lat: model.latitude, lng: model.longitude });
      }
    }
  }

  scrollToVacancy(id: string, latLng: LatLng) {
    if (!!id) {
      this.onScrollToVacancy.emit(id);
    }
    const zoom = this.map.getZoom() > 14 ? this.map.getZoom() : 14;
    this.map.flyTo([latLng.lat, latLng.lng], zoom);

    // this.map.flyTo([latLng.lat, latLng.lng], zoom,{
    //   animate: true,
    //   duration: 1.5
    // });
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next(true);
    if (!!this.map) {
      this.map.off();
      this.map.remove();
      this.map = null;
    }
  }

}
