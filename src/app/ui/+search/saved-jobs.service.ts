import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/core/services/storage.service';
import { SavedJobs } from './saved-jobs.interfaces';
import { BehaviorSubject } from 'rxjs';
import { VacancySearch } from 'src/app/core/interfaces/api.interfaces';
import { VacancySearchExtended } from 'src/app/core/interfaces/custom.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsService {

  storageKey = 'savedJobs';
  constructor(private _storageService: StorageService) { }

  private _savedJobs: SavedJobs[] = null;
  private _savedJobs$ = new BehaviorSubject<SavedJobs[]>(null);

  private _parse() {
    const saved = this._storageService.getItem(this.storageKey);
    if (!!saved) {
      const savedJobs = JSON.parse(<string>saved) as SavedJobs[];
      return savedJobs;
    }
    else return [];
  }


  get$() {
    if (!!this._savedJobs) {
      return this._savedJobs$.asObservable();
    } else {
      const jobs = this._parse();
      this._savedJobs = jobs;
      this._savedJobs$.next(jobs);
      return this._savedJobs$.asObservable();
    }
  }

  private _get() {
    if (!!this._savedJobs) {
      return this._savedJobs;
    } else {
      const jobs = this._parse();
      this._savedJobs = jobs;
      this._savedJobs$.next(this._savedJobs);
      return this._savedJobs;
    }
  }


  add(model: VacancySearchExtended) {
    if (!this.includes(model.id)) {
      const job: SavedJobs = {
        closingDate: model.closingDate,
        locationName: model.locationName,
        title: model.title,
        vacancyId: model.id
      };
      this._savedJobs.push(job);
      this._update(this._savedJobs);
    }
  }

  includes(id: string) {
    const jobs = this._get();
    return jobs.findIndex(o => o.vacancyId === id) > -1 ? true : false;
  }

  remove(id: string) {
    const jobs = this._get();
    const index = jobs.findIndex(o => o.vacancyId === id);
    if (index > -1) {
      jobs.splice(index, 1);
      this._update(jobs);
    }
  }

  private _update(jobs: SavedJobs[]) {
    this._savedJobs = jobs;
    this._savedJobs$.next(this._savedJobs);
    const items = JSON.stringify(this._savedJobs);
    this._storageService.setItem(this.storageKey, items);
  }

}
