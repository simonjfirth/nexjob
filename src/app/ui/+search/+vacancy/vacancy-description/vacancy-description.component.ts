import { Component, OnInit, Input } from '@angular/core';
import { VacancyDescriptions } from 'src/app/core/interfaces/custom.interfaces';
import { Description } from 'src/app/core/interfaces/vacancy-description.interfaces';

@Component({
  selector: 'app-vacancy-description',
  templateUrl: './vacancy-description.component.html'
})
export class VacancyDescriptionComponent implements OnInit {


  @Input() model: Description;
  constructor() { }

  ngOnInit() {
  }

}
