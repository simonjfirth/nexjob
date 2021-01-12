import { ViewChild } from '@angular/core';
import { MatTabGroup, MatTabNav } from '@angular/material/tabs';
import { ProfileOption } from '../interfaces/custom.interfaces';
import { Router } from '@angular/router';

export class TabRouterSwiper {

    @ViewChild('tabGroup', { static: true }) tabGroup: MatTabNav;
    public selected: number = 0;
    private swipeCoord?: [number, number];
    private swipeTime?: number;

    constructor(private _r: Router) { }
    swipe(e: TouchEvent, when: string, options: ProfileOption[]): void {
        const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                const swipe = direction[0] < 0 ? 'next' : 'previous';

                // get currentIndex ;
                const currentIndex = this.tabGroup.selectedIndex;

                switch (swipe) {
                    case 'previous':
                        if (currentIndex > 0) {
                            const item = options[currentIndex - 1];
                            this._r.navigateByUrl(item.url)
                        }

                        break;
                    case 'next':
                        if (this.selected < (<any>this.tabGroup)._tabLabelCount - 1) {
                            const item = options[currentIndex + 1];
                            this._r.navigateByUrl(item.url)
                        }

                        break;
                }
            }
        }
    }

}