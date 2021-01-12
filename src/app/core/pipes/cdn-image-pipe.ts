import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'cdnImage' })
export class CdnImagePipe implements PipeTransform {
    constructor() { }
    transform(url: string) {

        return `url(${url})`;
    }
} 