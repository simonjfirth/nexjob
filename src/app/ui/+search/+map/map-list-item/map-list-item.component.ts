import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { VacancySearch } from 'src/app/core/interfaces/api.interfaces';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-map-list-item',
  templateUrl: './map-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapListItemComponent implements OnInit {

  @Input() activeVacancy = '';
  @Input() model: VacancySearchExtended;
  @Output() onVacancySelected = new EventEmitter<VacancySearchExtended>();
  constructor(private _searchService: SearchService) { }

  ngOnInit() {
  }

  onActiveChanged() {
    this.activeVacancy = this.model.id;
    this.onVacancySelected.emit(this.model);
  }

  toggleSaved() {
    this._searchService.toogleSaveVacancy(this.model.id, !this.model.isSaved).subscribe();
  }

  canNav(e: Event) {
    //   e.preventDefault();
  }

  closingSoon() {
    if (!!this.model.expiryDate) {
      let dt = new Date(this.model.expiryDate);
      let cDt = new Date();
      const diff = dt.getTime() - cDt.getTime();
      var days = diff / (1000 * 3600 * 24);
      return days;
    }
    return null;
  }

  justadded() {
    if (!!this.model.liveDate) {
      let dt = new Date(this.model.liveDate);
      let cDt = new Date();
      const diff = dt.getTime() - cDt.getTime();
      var days = diff / (1000 * 3600 * 24);

      return days;
    }

    return null;
  }
}
