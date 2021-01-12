import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { StorageService } from './storage.service';
import { JWT } from '../interfaces/custom.interfaces';
import { map } from 'rxjs/operators';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthenticationStorageService {

    private _jwt: JWT = null;
    private _jwt$ = new BehaviorSubject<JWT>(this._jwt);
    hasJWT$ = this._jwt$.pipe(map(jwt => {
        if (!!jwt) {
            return true;
        }
        return false;
    }));

    firstName$ = this._jwt$.pipe(map(jwt => {
    
        if (!!jwt) {
            return jwt.firstName;
        }
        return '';
    }));

    private _jwtStorageKey = 'JWTSTORAGE-SF';
    constructor(protected storageService: StorageService) {
        let jwt = this.getJWT();
        if (!!jwt) {
            this._jwt$.next(jwt);
        }
    }

    getJWT() {
        return this.storageService.getItem<JWT>(this._jwtStorageKey);
    }

    setJWT(jwt: JWT) {
        this._jwt$.next(jwt);
        this.storageService.setItem(this._jwtStorageKey, jwt);
    }

    getName() {
        let jwt = this.getJWT();
        return of(`${jwt.firstName} ${jwt.lastName}`);
    }

    hasJWT() {
        let jwt = this.storageService.getItem<JWT>(this._jwtStorageKey);
        let hasJWT = jwt !== null ? true : false;
        if (hasJWT === false) {
            return false;
        }
        return true;
        let jwtExpiration = new Date(jwt['.expires']).getTime();
        let isInDate = jwtExpiration > new Date().getTime();
        if (isInDate === false) {
            this.clearJWT();
        }
        return hasJWT === true && isInDate === true ? true : false;
    }

    clearJWT() {
        this._jwt$.next(null);
        this.storageService.clearItem(this._jwtStorageKey);
    }

    hasPermission(requiredPermissions: Permissions[]) {
        /*
        let userPermissions = this.getPermissions();
        if (!userPermissions) {
            return false;
        }
        // cycle through all, has ANY permissions.
        for (let i = 0; i < requiredPermissions.length; i++) {
            if (userPermissions.indexOf(requiredPermissions[i]) !== -1) {
                return true;
            }
        }
*/
        return true;
    }

    getPermissions(): number[] {
        return [];
        let jwt = this.getJWT();
        if (!jwt) {
            return null;
        }
        let roles = <string>jwt['roles'];
        const rolesArray = roles.split(',');

        // return rolesArray;
    }
}