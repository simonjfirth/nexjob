import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class HttpMonitoringService {


    private static singleton: HttpMonitoringService;
    private _activeConnections: string[] = [];
    private _activeConnections$ = new BehaviorSubject<string[]>(this._activeConnections);
    activeConnections$ = this._activeConnections$.pipe(
        filter(con => !!con),
        map(connections => {
            return connections.length;
        }));

    constructor() {
        if (!HttpMonitoringService.singleton) {
            HttpMonitoringService.singleton = this;
        }
    }

    addConnection(url: string) {
        if (!this._activeConnections) {
            this._activeConnections = [];
        }
        this._activeConnections.push(url);
        this._activeConnections$.next(this._activeConnections);
    }

    removeConnection(url: string) {
        let connections = this._activeConnections.filter(con => con !== url);
        this._activeConnections = connections;
        this._activeConnections$.next(this._activeConnections);
    }
}