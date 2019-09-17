import { Observable } from "rxjs";
import { NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

export default class MockServices {
    public navigation = new NavigationEnd(0, environment.FRONTED_URL, environment.FRONTED_URL);
    public events = new Observable(observer => {
      observer.next(this.navigation);
      observer.complete();
    });
}
