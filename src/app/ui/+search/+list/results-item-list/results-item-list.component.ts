import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../search.service';
import { VacancySearch } from 'src/app/core/interfaces/api.interfaces';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-item-list',
  templateUrl: './results-item-list.component.html'
})
export class ResultsItemListComponent implements OnInit {

  @Input() activeVacancy = '';
  @Input() model: VacancySearchExtended;
  @Output() onVacancySelected = new EventEmitter<VacancySearchExtended>();

  constructor(private _searchService: SearchService, private _router: Router) { }

  ngOnInit() {
  }

  toggleSaved(e: Event) {
    e.stopPropagation();
    this._searchService.toogleSaveVacancy(this.model.id, !this.model.isSaved).pipe(
      take(1)).subscribe();
  }

  prettyFormat() {
    let str = `${this.model.title}--${this.model.locationName}`;
    str = str.replace(/[^a-zA-Z0-9]/g, '-');
    return str;
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

  onActiveChanged() {
    if (this.activeVacancy !== this.model.id) {
      this.activeVacancy = this.model.id;
      this.onVacancySelected.emit(this.model);
    } else {
      this._router.navigateByUrl('/' + this.model.id);
    }
  }


  justadded() {
    if (!!this.model.liveDate) {
      let dt = new Date(this.model.liveDate);
      let cDt = new Date();
      const diff = cDt.getTime() - dt.getTime();
      var days = diff / (1000 * 3600 * 24);
      return days;
    }
    return null;
  }

}
