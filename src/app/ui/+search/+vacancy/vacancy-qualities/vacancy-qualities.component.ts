import { Component, OnInit, Input } from '@angular/core';
import { Quality } from 'src/app/core/interfaces/api.interfaces';

@Component({
  selector: 'app-vacancy-qualities',
  templateUrl: './vacancy-qualities.component.html'
})
export class VacancyQualitiesComponent implements OnInit {

  @Input() qualities: Quality[] = [];
  constructor() { }

  ngOnInit() {
  }

}
