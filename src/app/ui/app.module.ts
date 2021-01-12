import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../core/components/select/header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GeniusCoreModule } from '../core/modules/genius-core.module';
import { MatMenuModule } from '@angular/material/menu';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressBarModule,
    GeniusCoreModule,
    MatMenuModule
  ],
  providers: [
    Ng2IzitoastService,

    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: HammerGestureConfig 
  }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
