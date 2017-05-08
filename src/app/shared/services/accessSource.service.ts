import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccessSourceService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getListData_Hour(): Promise<any> {
    return this.http.get('/accessSource/getListData_hour').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getPieData(startDate,endDate): Promise<any> {
    return this.http.get('/accessSource/getPieData?startDate='+startDate+'&endDate='+endDate).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getBarData1(): Promise<any> {
    return this.http.get('/accessSource/getBarData1').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getListData1(startDate,endDate): Promise<any> {
    return this.http.get('/accessSource/getListData1?startDate='+startDate+'&endDate='+endDate).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getListData2(startDate,endDate): Promise<any> {
    return this.http.get('/accessSource/getListData2?startDate='+startDate+'&endDate='+endDate).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getListData3(startDate,endDate): Promise<any> {
    return this.http.get('/accessSource/getListData3?startDate='+startDate+'&endDate='+endDate).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getTop10ListData(): Promise<any> {
    return this.http.get('/accessSource/getTop10ListData').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  

}