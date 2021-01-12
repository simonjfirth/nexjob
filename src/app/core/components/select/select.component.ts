import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';
import { IOption, KeyValue } from '../../interfaces/custom.interfaces';


@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @Input() placeholder = '';
    @Input() bindLabel = 'Value';
    @Input() bindValue = 'Key';

    @Input() formControlInput: FormControl;
    @Output() optionChanged = new EventEmitter<IOption | IOption[] | KeyValue>();
    @Input() options: IOption[] = [];
    @Input() multiSelect = false;
    @Input() searchable = false;
    @Input() clearable = false;
    @Input() selected = null;
    @Input() forceOpen = false;
    @Input() hasInputHolder = false;
    @Input() typeahead: EventEmitter<string>;
    @Input() isRequired = false;
    @Input() inputHolderTitle = '';
    @Input() dark = false;
    @Input() disabled = false;
    sub: Subscription;
    constructor() { }

    ngOnInit() {
        if (!!this.formControlInput) {
            this.sub = this.formControlInput.valueChanges.pipe(
                filter(val => !!val && !!this.typeahead),
                first(),
            ).subscribe(val => {
                this.typeahead.next(this.formControlInput.value);
            });
        }
    }

    selectChanged(option: IOption) {
        this.optionChanged.emit(option);
    }

    onSearch(search: string) {

    }

    focus(a: NgSelectComponent) {
        if (!a.isOpen) {
            a.toggle();
        }
    }
    ngOnDestroy() {
        if (!!this.sub) {
            this.sub.unsubscribe();
        }
    }

}
