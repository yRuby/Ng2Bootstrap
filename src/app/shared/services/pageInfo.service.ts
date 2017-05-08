import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageInfoService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  getLineData(startDate,endDate): Promise<any> {
    return this.http.get('/pageInfo/getLineData?startDate='+startDate+'&endDate='+endDate).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }



}