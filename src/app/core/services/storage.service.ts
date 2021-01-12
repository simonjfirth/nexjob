import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

/// <reference types="crypto-js" />
import * as CryptoJS from 'crypto-js';

export interface TimeoutStorage {
    key: string;
    model: any;
    timeout: Date;
}

export interface ILocalStorage {
    clear: () => void;
    getItem: (key: string) => string;
    key: (index: number) => string;
    removeItem: (key: string) => void;
    setItem: (key: string, value: string) => void;
    length: number;
}

@Injectable({ providedIn: 'root' })
export class StorageService {

    private static singleton: StorageService;
    private _storage: TimeoutStorage[] = [];
    private _key = 'caaf3799-6824-44fd-8c32-e21cba43d51f';
    private _storage$ = new BehaviorSubject<TimeoutStorage[]>(this._storage);
    isIE = false;

    constructor() {
        if (!StorageService.singleton) {
            StorageService.singleton = this;
        }
        this.isIE = this._isIE();
    }

    getItem<T>(key: string): T {
        if (this.isIE) {
            let item = localStorage.getItem(key);
            if (!!item) {
                let itemString = item;
                return <T>JSON.parse(itemString);
            }
        } else {
            let item = localStorage.getItem((btoa(key)));
            if (!!item) {
                let itemString = atob((item));
                return <T>JSON.parse(itemString);
            }
        }
        return null;
    }

    clearItem(key: string) {
        if (this.isIE) {
            localStorage.removeItem(key);
        } else {
            localStorage.removeItem((btoa(key)));
        }
    }

    setItem(key: string, item: any) {
        if (this.isIE) {
            let data = JSON.stringify(item);
            localStorage.setItem(key, data);
        } else {
            let data = JSON.stringify(item);
            localStorage.setItem((btoa(key)), (btoa(data)));
        }
    }

    setWithTimeout(key: string, item: any, timeoutMintues: number = 1) {
        let timeperiod = new Date();
        // large cache on lookups
        if (key.toLowerCase().includes('cache=infinite')) {
            timeoutMintues = 60;
        }
        timeperiod.setMinutes(timeperiod.getMinutes() + timeoutMintues);
        let model: TimeoutStorage = {
            key: key,
            model: item,
            timeout: timeperiod
        };

        this._storage.push(model);
        this._storage$.next(this._storage);
    }

    getFromTimeoutStorage(key: string) {
        this._cleanupTimeoutModels();
        let found = this._storage.find(item => item.key === key);
        if (!!found) {
            return found.model;
        }
        return null;
    }

    clearTimeoutStorage() {
        this._storage = [];
        this._storage$.next(this._storage);
    }

    clearItemTimeoutStorage(key: string) {
        let filtered = this._storage.filter(item => item.key !== key);
        this._storage = filtered;
        this._storage$.next(this._storage);
    }

    private _cleanupTimeoutModels() {
        let currentTime = new Date();
        let cleaned = this._storage.filter(storage => storage.timeout > currentTime);
        if (!cleaned) {
            cleaned = [];
        }

        this._storage = cleaned;
        this._storage$.next(this._storage);
    }


    encryptModel(model: TimeoutStorage) {
        let stringModel = JSON.stringify(model);
        let ciphertext = CryptoJS.AES.encrypt(stringModel, this._key);
        return ciphertext;
    }


    decryptModel(model: string) {
        try {
            let bytes = CryptoJS.AES.decrypt(model, this._key);
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } catch (e) {
            return model;
        }
    }

    encrypt(model: string) {
        let ciphertext = CryptoJS.AES.encrypt(model, this._key);
        return ciphertext;
    }

    decrypt(model: string) {
        let bytes = CryptoJS.AES.decrypt(model, this._key);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }

    private _isIE() {
        return true;
        const match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
        let isIE = false;

        if (match !== -1) {
            isIE = true;
        }
        return isIE;
    }


}