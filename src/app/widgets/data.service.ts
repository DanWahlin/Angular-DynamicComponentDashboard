import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    
    constructor(private http: Http) { }

    getData(url: string) : Observable<any> {
        return this.http.get(url).map((res: Response) => res.json());
    }

}