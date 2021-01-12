import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VacancySearch, SimilarVacancies, Details, BusinessArea, Brand } from 'src/app/core/interfaces/api.interfaces';
import { BehaviorSubject, forkJoin, combineLatest, zip, of } from 'rxjs';
import { tap, map, switchMap, take, debounceTime } from 'rxjs/operators';
import { LatLng, Vacancy, VacancySearchExtended, IOption, HasApp, searchThisArea } from 'src/app/core/interfaces/custom.interfaces';
import { LocationService } from './location.service';
import { SavedJobsService } from './saved-jobs.service';
import { VacancyModel } from 'src/app/core/interfaces/vacancy-description.interfaces';


@Injectable()
export class SearchService {

    private _searchResults$ = new BehaviorSubject<VacancySearchExtended[]>([]);
    searchResults$ = this._searchResults$.asObservable();

    private _locationName$ = new BehaviorSubject<string>('');
    locationName$ = this._locationName$.asObservable();

    private _favouritesFilter$ = new BehaviorSubject<boolean>(false);
    favouritesFilter$ = this._favouritesFilter$.asObservable();

    private _searchArea$ = new BehaviorSubject<searchThisArea>({
        canSearch: true,
        lat: 0,
        lng: 0
    });

    searchArea$ = this._searchArea$.asObservable();
    private _businessAreaLookups$ = new BehaviorSubject<IOption[]>([]);
    businessAreaLookups$ = this._businessAreaLookups$.asObservable();


    private _brandLookup$ = new BehaviorSubject<IOption[]>([]);
    brandLookup$ = this._brandLookup$.asObservable();

    private _keywords$ = new BehaviorSubject<string>('');
    keywords$ = this._keywords$.asObservable();

    private _userLatLng$ = new BehaviorSubject<LatLng>(null);

    private _brand$ = new BehaviorSubject<number>(null);
    brand$ = this._brand$.asObservable();

    private _radius$ = new BehaviorSubject<number>(null);
    radius$ = this._radius$.asObservable();

    private _sort$ = new BehaviorSubject<string>(null);
    sort$ = this._sort$.asObservable();

    private _businessAreas$ = new BehaviorSubject<number>(null);
    businessAreas$ = this._businessAreas$.asObservable();

    private _inInternal$ = new BehaviorSubject<boolean>(false);

    private _vacancyId$ = new BehaviorSubject<number>(null);

    userLatLng$ = this._userLatLng$.asObservable();

    constructor(private _configService: ConfigService,
        public locationService: LocationService,
        private _savedService: SavedJobsService,
        private _http: HttpClient) { }

    search() {
        return zip(
            this._userLatLng$,
            this._keywords$,
            this._businessAreas$,
            this._inInternal$,
            this._brand$,
            this._vacancyId$,
            this._favouritesFilter$,
            this._radius$,
            this._sort$
        ).pipe(map(data => {
            const latLng = data[0];
            const keywords = data[1];
            const businsessArea = data[2];
            const internal = data[3];
            const brands = data[4];
            const vacancyId = data[5];
            const favOnly = data[6];
            const radius = data[7];
            const sort = data[8];
            let params = new HttpParams();
            let searchModel = {};

            if (!!radius) {
                searchModel['distance'] = radius;
            } else {
                searchModel['distance'] = 5;
            }

            if (!!latLng) {
                searchModel['lat'] = latLng.lat;
                searchModel['lng'] = latLng.lng;
            }

            if (!!keywords) {
                params = params.append('keyword', keywords);
                searchModel['keyword'] = keywords;
            }

            this._searchResults$.next([]);
            return {
                params: {},
                isFav: favOnly,
                radius: radius,
                sort: sort,
                searchModel: searchModel
            };
        }),
            switchMap(m => {
                const params = m.params;
                return this._http.post<VacancySearchExtended[]>(this._configService.advancedsearch, m.searchModel).pipe(
                    debounceTime(500),
                    tap(resp => {
                        resp.forEach(o => {
                            o.isSaved = this._savedService.includes(o.id);
                            o.logoUrl = this._clientLogo(o.clientId, o.brandId);
                        });

                        if (m.isFav) {
                            resp = resp.filter(o => o.isSaved === true);
                        }

                        if (!!m.sort) {
                            switch (m.sort) {
                                case 'Distance':
                                    break;
                                case 'Date':
                                    resp = resp.sort((a, b) => new Date(a.liveDate).getTime() < new Date(b.liveDate).getTime() ? 1 : -1);
                                    break;
                                case 'Salary':
                                    resp = resp.sort((a, b) => a.salaryActual < b.salaryActual ? -1 : 1);
                                    break;


                            }

                        }

                        this._searchResults$.next(resp);
                    }));
            }),

        );
    }

    toogleSaveVacancy(id: string, save: boolean) {
        return this._searchResults$.pipe(
            take(1),
            map(results => {
                const vacancies = results.filter(o => o.id === id);
                vacancies.forEach(vac => {
                    vac.isSaved = save;
                    this._searchResults$.next(results);
                    save === true ? this._savedService.add(vac) : this._savedService.remove(id);
                });
            }));
    }



    async getUserGeoLocation() {
        return await this._getUserGeoLocation().then(position => {
            const latLng: LatLng = {
                lat: (<any>position).coords.latitude,
                lng: (<any>position).coords.longitude
            }
            this.locationService.reverseGeocodeFetch(latLng).then(data => {
                if (!!data.address) {
                    this._locationName$.next(data.address.suburb ? data.address.suburb : data.address.city);
                }
            })
            this._userLatLng$.next(latLng);
            return latLng;
        }).catch(async err => {
            console.warn('ip lookup');
            let scope$ = this;
            let resp = await fetch('https://ipapi.co/json/').then(resp => resp.json()).then(data => {
                let latLng: LatLng;
                if (!!data) {
                    latLng = {
                        lat: data.latitude,
                        lng: data.longitude
                    }
                    scope$._locationName$.next(data.city);
                    // scope$._userLatLng$.next(null);
                }
                return latLng;
            });
            return resp;
        });
    }

    get AllJobCount$() {
        return this._http.get('https://nexjob-candidate-api.ats.careers/api/Vacancy/Count')
    }

    updateLatLng(lat: number | string, lng: number | string) {
        lat = parseFloat(<string>lat);
        lng = parseFloat(<string>lng);
        this._userLatLng$.next({ lat: lat, lng: lng })
    }

    updateLatLngWithReverseGeoCode(lat: number | string, lng: number | string) {
        lat = parseFloat(<string>lat);
        lng = parseFloat(<string>lng);
        const model: LatLng = { lat: lat, lng: lng };
        this._userLatLng$.next(model)
        this.locationService.reverseGeocodeFetch(model).then(data => {
            if (!!data.address) {
                this._locationName$.next(data.address.suburb ? data.address.suburb : data.address.city);
            }
        })
    }

    onSearchArea() {
        return this._searchArea$.pipe(map(latLng => {
            this.updateLatLngWithReverseGeoCode(latLng.lat, latLng.lng);
        }));

    }

    bannerUrl(id: string) {
        return this._configService.bannerImage(id);
    }

    updateKeywords(keywords: string) {
        this._keywords$.next(keywords);
    }

    udpdateBrand(brandId: number) {
        this._brand$.next(brandId);
    }

    updateSort(sort: string) {
        this._sort$.next(sort);
    }

    updateRadius(radius: number) {
        this._radius$.next(radius);
    }

    updateFav(fav: boolean) {
        this._favouritesFilter$.next(fav);
    }

    updateisInternal(internal: boolean) {
        this._inInternal$.next(internal);
    }

    updateVacancyId(id: number) {
        this._vacancyId$.next(id);
    }

    updateBusinessArea(id: number) {
        this._businessAreas$.next(id);
    }

    updateSearchArea(model: searchThisArea) {
        this._searchArea$.next(model);
    }


    vacancy(id: string) {
        return this._http.get<VacancyModel>(this._configService.vacancy(id));
    }


    clearResults() {
        this._searchResults$.next([]);
    }

    getClientLogo(a, b) {
       return this._clientLogo(a, b);
    }


    private _clientLogo(clientId, brandId) {
        if (clientId === 'E91B9E84-CB99-4154-81ED-CAB2BEEC83BD' && brandId === null) {
            return null;
        }
        if (brandId == null) {
            return `https://prodnexgencdnendpoint.azureedge.net/nexgen-2/${clientId.toUpperCase()}/nexjob-logo.png`;
        }
        return `https://nexgen.ats.careers/api/${clientId.toUpperCase()}/GetBrandImage/${brandId.toUpperCase()}`;
    }


    private _getUserGeoLocation() {
        if (!!navigator.geolocation) {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        } else {
            return new Promise(
                resolve => resolve({})
            )
        }
    }


    get radius() {
        const model: IOption[] = [
            {
                Key: 0.5,
                Value: '0.5 Miles'
            },
            {
                Key: 1,
                Value: '1 Miles'
            },
            {
                Key: 3,
                Value: '3 Miles'
            },
            {
                Key: 5,
                Value: '5 Miles'
            },
            {
                Key: 10,
                Value: '10 Miles'
            },
            {
                Key: 15,
                Value: '15 Miles'
            },
            {
                Key: 25,
                Value: '25 Miles'
            },
            {
                Key: 50,
                Value: '50 Miles'
            },
            {
                Key: 100,
                Value: '100 Miles'
            },
            {
                Key: 1000,
                Value: '100+ Miles'
            }
        ]
        return model;
    }








}
