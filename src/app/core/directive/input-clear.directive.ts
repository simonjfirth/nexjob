import { ThrowStmt } from '@angular/compiler';
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appInputClear]'
})
export class InputClearDirective implements OnInit, OnDestroy {

  sub: Subscription;
  constructor(private el: ElementRef, private control: NgControl) { }

  ngOnInit() {
    const parentElement = (this.el.nativeElement as HTMLElement).parentElement;
    parentElement.style.position = 'relative'
    let buttonClear = document.createElement('button');
    buttonClear.type = 'button';
    ['btn', 'btn-icon'].forEach((classItem => {
      buttonClear.classList.add(classItem);
    }));




    buttonClear.innerHTML = '<span class="material-icons" style="font-size: 14px">close</span>'
    buttonClear.style.position = 'absolute';
    buttonClear.style.top = '10px';
    buttonClear.style.right = '10px';
    buttonClear.type = 'button';

    if (this.el.nativeElement.type === 'select-one') {
      this.el.nativeElement.style.paddingRight = '30px';
      buttonClear.style.right = '25px';
    }

    buttonClear.style.fontSize = '12px';
    buttonClear.style.display = 'none';

    if (!!this.control.control.value && this.control.control.value.length > 0) {
      buttonClear.style.display = 'block';
    }


    this.sub = this.control.control.valueChanges.pipe(map(value => {
      if (value.length <= 0) {
        buttonClear.style.display = 'none';
      } else {
        buttonClear.style.display = 'block';
      }
    })).subscribe();

    parentElement.append(buttonClear);

    let scope$ = this;
    buttonClear.addEventListener('click', function (e) {
      e.preventDefault();
      buttonClear.style.display = 'none';
      scope$.control.control.setValue('')
    })

  }

  ngOnDestroy() {

  }

}
