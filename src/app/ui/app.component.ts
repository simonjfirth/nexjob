import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpMonitoringService } from '../core/services/htto-monitoring.service';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router, NavigationEnd, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasRequests = false;
  listView = false;
  menuVisibility = false;
  hasRequests$: Subscription;
  @ViewChild('navMenu', { static: true }) navMenu: ElementRef;
  @ViewChild('navButton', { static: true }) navButton: ElementRef;

  

  constructor(private _httpMonitoringService: HttpMonitoringService,
    private router: Router,
    private change: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(res => {
      if (this.router.url === '/' || this.router.url.includes('tile') || this.router.url.includes('/?')) {
        this.listView = true;
      }
      else {
        this.listView = false;
      }
    });

    (this.navButton.nativeElement as HTMLElement).addEventListener('click',((el)=>{
      (this.navMenu.nativeElement as HTMLElement).classList.toggle('w-nav-menu--open');
      (this.navButton.nativeElement as HTMLElement).classList.toggle('w--open');
    }));

    this.hasRequests$ = this._httpMonitoringService.activeConnections$.pipe(map(number => {
      this.hasRequests = (number > 0) ? true : false;
      let allForms = document.querySelectorAll('form');
      if (this.hasRequests) {
        allForms.forEach(form => {
          form.style.pointerEvents = 'none';
        });
      } else {
        allForms.forEach(form => {
          form.style.pointerEvents = 'initial';
        });
      }

      this.change.detectChanges();
      return this.hasRequests;
    })).subscribe();
  }
}
