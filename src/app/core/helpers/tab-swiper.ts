import { ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

export class TabSwiper {

    @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
    public selected: number = 0;
    private swipeCoord?: [number, number];
    private swipeTime?: number;
    
    constructor() { }
    swipe(e: TouchEvent, when: string): void {
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
                switch (swipe) {
                    case 'previous':
                        if (this.selected > 0) { this.selected--; }
                        break;
                    case 'next':
                        if (this.selected < this.tabGroup._tabs.length - 1) { this.selected++; }
                        break;
                }
            }
        }
    }

}