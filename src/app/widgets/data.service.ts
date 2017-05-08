import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    
    //Put Http in services, not in components
    constructor(private http: Http) { }

    getData(url: string) : Observable<any> {
        return this.http.get(url).map((res: Response) => res.json());
    }

    saveSettings(settings: any) : Observable<boolean>{
        let settingsUrl = '/api/settings';
        return this.http.post(settingsUrl, settings)
                   .map((res: Response) => res.json());
    }

}