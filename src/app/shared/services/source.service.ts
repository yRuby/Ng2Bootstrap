import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class SourceService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }

  getDataWithType(siteId, startDate, endDate): Promise<any> {
    return this.http.get('/source/all?siteId=' + siteId + '&startDate=' + startDate + '&endDate=' + endDate).toPromise()
      .then(response => {
        return response.json()
      })
      .catch(this.handleError)
  }



}