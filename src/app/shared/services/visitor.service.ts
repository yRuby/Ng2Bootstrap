import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VisitorService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getVisitorDataByProvince(startDate,endDate,idSite): Promise<any> {
    return this.http.get('/visitorAnalysis/getVisitorIpMap?startDate='+startDate+'&endDate='+endDate+'&siteId='+idSite).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
}