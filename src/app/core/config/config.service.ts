import { Injectable } from '@angular/core';
import { BaseConfigService } from './base.config.service';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private static singleton: ConfigService;
    private _baseUrl = '{api}/{clientId}';

    constructor() {
    }

    bannerImage(id: string) {
        return this._resolveUrl(`https://prodnexgencdn.blob.core.windows.net/nexgen-2/{clientId}/${id}.jpg`);
    }



    get search() {
        return this._resolveUrl(`vacancysimple`);
    }

    get advancedsearch() {
        return this._resolveUrl(`advancedSearch`);
    }

    vacancy(id: string) {
        return this._resolveUrl(`vacancy?ref=${id}`);
    }


    reverseGeocoding(lat: number, lng: number) {
        return `https://eu1.locationiq.com/v1/reverse.php?key=pk.93569e718f31d7b3f42f8ad40931524e&lat=${lat}&lon=${lng}&format=json`
    }

    locationLookup(q: string) {
        return `https://eu1.locationiq.com/v1/search.php?key=pk.93569e718f31d7b3f42f8ad40931524e&q=${q}&format=json&countrycodes=gb,ie,nl,de`
    }

    postcodeLookup(q: string) {
        return `https://eu1.locationiq.com/v1/search.php?key=pk.93569e718f31d7b3f42f8ad40931524e&postalcode=${q}&format=json&&addressdetails=1`
    }


  

    protected _resolveUrl(urlToResolve: string) {
        return `https://nexjob-vacancy-api.ats.careers/api/${urlToResolve}`
    }


}
