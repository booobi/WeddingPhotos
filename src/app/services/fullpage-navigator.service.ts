import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FullpageNavigatorService {
    instance: any;
    initialize(selector: string) {
        this.instance = new (window as any).fullpage(selector, {
            autoScrolling:true,
            scrollHorizontally: true
        });
    }
    navigateUp(){
        this.instance.moveSectionUp()
    }
    navigateDown(){
        this.instance.moveSectionDown()
    }
}