import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class MasonryService {
    instance: any;
    initialize(selector: string, itemSelector: string) {
        this.instance = new (window as any).Masonry(selector, {
            itemSelector: itemSelector,
            columnWidth: 100,
            // isAnimated: true,
            // gutter: 10
          });
    }
}