import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

import { Injectable, Inject } from '@angular/core';

import { EMPTY, of, throwError, Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ToastService } from './toast.service';
import { StorageService } from './storage.service';
import { HttpMonitoringService } from './htto-monitoring.service';
import { AuthenticationStorageService } from './auth-storage.service';




@Injectable()
export class JWTInterceptor implements HttpInterceptor {


    constructor(
        private _storageService: StorageService,
        private _toastService: ToastService,
        private _httpMonitoringService: HttpMonitoringService,
        protected _router: Router,
        private _authenticationStorageService: AuthenticationStorageService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let dupReq = req.clone();
        let reqType = req.method;

        let token = this._authenticationStorageService.getJWT();

        if (!!token && !req.url.toLowerCase().includes('locationiq.com')) {
            const JWT = `bearer ${token.token}`;
            let clientId = this._authenticationStorageService.getJWT().clientId;
            dupReq = req.clone({
                headers: new HttpHeaders(
                    {
                        'Content-Type': 'application/json',
                        'Authorization': JWT,
                        'Fingerprint': '1c8167aafb5b9d9b072bac585441cb5f',
                        'clientId': token.clientId
                    })
            });
        }



        // Caching Response
        reqType = req.method;
        if (reqType === 'GET') {
            let reqBody = this._storageService.getFromTimeoutStorage(req.urlWithParams);
            if (!!reqBody) {
                return of(reqBody);
            }
        }

        if (reqType === 'POST') {
            const body = !!req.body ? JSON.stringify(req.body) : '';
            let reqBody = this._storageService.getFromTimeoutStorage(req.url + body);
            if (!!reqBody) {
                return of(reqBody);
            }
        }


        this._httpMonitoringService.addConnection(req.url);
        let removalUrl = req.url;

        return next.handle(dupReq).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this._httpMonitoringService.removeConnection(event.url);
                    if (reqType === 'GET') {
                        this._storageService.setWithTimeout(req.urlWithParams, event);
                    }
                    if (reqType === 'POST') {
                        const body = !!req.body ? JSON.stringify(req.body) : '';
                        this._storageService.setWithTimeout(req.url + body, event);
                    }

                }
            }),
            catchError(response => {
                this._httpMonitoringService.removeConnection(response.url);
                if (response instanceof HttpErrorResponse) {
                    if (response.status === 400) {

                        // different resonse
                        // if (skipToken === true) {
                        //     let tokenError = <any>response.error;
                        //     this._toastService.error(tokenError.error_description, 3000);
                        //     return throwError(tokenError);
                        // }

                        let error = <any>response.error;
                        let errors = this._getErrorResponseArray(response);
                        this._toastService.error(errors.join('</br>'), 3000);
                        return throwError(error);
                    } else if (response.status === 401) {
                        // let url = this._router.url;

                        this._toastService.error('Unauthorized', 3000);
                        this._authenticationStorageService.clearJWT();
                        this._router.navigate(['/']);
                    }
                    if (response.status === 500) {
                        let er = this._getErrorResponseArray(response);
                        this._toastService.error(er.join('</br>'), 3000);
                        return throwError('Server Error');
                    }
                }
                return throwError(response);
            }),
            finalize(() => {
                setTimeout(() => {
                    this._httpMonitoringService.removeConnection(removalUrl);
                }, 1000);
            }),
        );
    }

    private _getErrorResponseArray(err: HttpErrorResponse) {
        let error = <any>err.error;
        if (!!error.ModelState) {
            let keys = Object.keys(error.ModelState);
            let errors = keys.map(key => {
                return <string>error.ModelState[key];
            });
            return errors;
        }
        // message??
        if (!!error.Message) {
            return [error.Message]
        }
        if (Array.isArray(error)) {
            return error;
        }
        if (typeof error === 'string') {
            return [error];
        }

        return ['An error as occurred'];
    }
}