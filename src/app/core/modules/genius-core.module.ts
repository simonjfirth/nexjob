import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectComponent } from '../components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from '../services/http-interceptor.service';
import { CdnImagePipe } from '../pipes/cdn-image-pipe';
import { InputClearDirective } from '../directive/input-clear.directive';


@NgModule({
    imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule
    ],
    declarations: [
        SelectComponent,
        CdnImagePipe,
        InputClearDirective
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
    ],
    exports: [
        NgSelectModule,
        SelectComponent,
        InputClearDirective,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CdnImagePipe,
        CommonModule
    ],

})
export class GeniusCoreModule { }
