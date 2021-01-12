import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationStorageService } from 'src/app/core/services/auth-storage.service';
import { tap } from 'rxjs/operators';
import { menuOptions } from './header.interface';
import { HeaderService } from 'src/app/core/services/header.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  title$ = this._headerService.headerTitle$;
  hasBack$ = this._headerService.hasBack$;

  constructor(private _headerService: HeaderService,
    private _location: Location,
    private _authenticationStorageService: AuthenticationStorageService) { }

  ngOnInit() {
  }
  
  onBack(){
    this._location.back();
  }

}
