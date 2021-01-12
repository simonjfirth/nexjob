import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './+list/list.component';
import { MapComponent } from './+map/map.component';
import { SearchBlockComponent } from './search-block/search-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeniusCoreModule } from 'src/app/core/modules/genius-core.module';
import { SearchService } from './search.service';
import { CountUpModule } from 'ngx-countup';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapItemComponent } from './+map/map-item/map-item.component';
import { MapListItemComponent } from './+map/map-list-item/map-list-item.component';
import { VacancyComponent } from './+vacancy/vacancy.component';
import { SchemaPipe } from 'src/app/core/pipes/schema-pipe.pipe';
import { VacancyDescriptionComponent } from './+vacancy/vacancy-description/vacancy-description.component';
import { LocationService } from './location.service';
import { VacancyQualitiesComponent } from './+vacancy/vacancy-qualities/vacancy-qualities.component';
import { SafePipe } from 'src/app/core/pipes/safe.pipe';
import { GridComponent } from './+grid/grid.component';
import { ResultsItemListComponent } from './+list/results-item-list/results-item-list.component';
import { ResultsItemComponent } from './+grid/results-item/results-item.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: { animation: 'HomePage' }

      },
      {
        path: 'tile',
        component: GridComponent,
        data: { animation: 'AboutPage' }

      },
      {
        path: 'map',
        component: MapComponent,
        data: { animation: 'Anim' }

      },
    ],
  },
  {
    path: ':id',
    component: VacancyComponent
  },

  {
    path: ':id/:title',
    component: VacancyComponent
  }

]

@NgModule({
  imports: [
    GeniusCoreModule,
    LeafletModule,
    CountUpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SafePipe,
    SearchComponent,
    MapComponent,
    ListComponent,
    MapListItemComponent,
    MapItemComponent,
    GridComponent,
    SearchBlockComponent,
    ResultsItemComponent,
    VacancyComponent,
    VacancyDescriptionComponent,
    VacancyQualitiesComponent,
    ResultsItemListComponent,
    SchemaPipe
  ],
  exports: [
    SchemaPipe
  ],
  providers: [
    SearchService,
    LocationService]
})
export class SearchModule { }
