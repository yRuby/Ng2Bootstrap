import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';            //通过他拽换成promise对象

import { Unit } from '../app/pages/unit';

@Injectable()

export class UnitService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private deptsUrl = 'EmployeeService/api/unit/'; 

  constructor(private http: Http) { }

getDepts(): Promise<Unit[]> {
      return this.http.get(this.deptsUrl)
               .toPromise()
               .then(response => response.json().data as Unit[])
               .catch(this.handleError);
  }
/*
  getDept(id: number): Promise<Unit> {
    const url = `${this.deptsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Unit)
      .catch(this.handleError);
  }
*/
  delete(id: string): Promise<void> {
    const url = this.deptsUrl+id;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(dept: Unit): Promise<Unit> {
    return this.http
      .post(this.deptsUrl, JSON.stringify(dept), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(dept: Unit): Promise<Unit> {
    const url = this.deptsUrl+dept.id;
    return this.http
      .put(url, JSON.stringify(dept), {headers: this.headers})
      .toPromise()
      .then(() => dept)
      .catch(this.handleError);
  }
  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}