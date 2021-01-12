import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerTitle$ = new BehaviorSubject<string>('');
  headerTitle$ = this._headerTitle$.asObservable();

  private _hasBack$ = new BehaviorSubject<boolean>(false);
  hasBack$ = this._hasBack$.asObservable();

  private _backUrl$ = new BehaviorSubject<string>('');
  backUrl$ = this._backUrl$.asObservable();

  constructor() { }

  updateHeaderName(title: string) {
    this._headerTitle$.next(title);
  }

  hasBack(url: boolean) {
    this._hasBack$.next(url);
  }

  headerBackUrl(url: string) {
    this._backUrl$.next(url);
  }

}
