import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';            //通过他拽换成promise对象

import { Employee } from '../app/pages/employee' //没有导出？ 接口中声明类型

@Injectable()
export class EmployeeService {

  private headers = new Headers({'Content-Type': 'application/json'});     //angular默认的请求方式 是json ,如果不是需要更改
  private usersUrl = 'api/users'; 

  constructor(private http: Http) { }

  getUsers(): Promise<Employee[]> {             
      //return this.http.get("EmployeeService/api/user/")
      const url=this.usersUrl;
      return this.http.get(this.usersUrl)       //获取数据地址，然后转化为承诺
               .toPromise()
               .then(response => response.json().data as Employee[])  //获取数据转换类型 回调函数then()调用了返回对象的json()方法，将data从返回对象分离出来
               .catch(this.handleError);
  }
/*
  getUser(id: number): Promise<Employee> {        //Promise<Employee>是一个承诺，承诺返回的数据类型是Employee
    const url = `${this.usersUrl}/${id}`;         //员工的路径和当前员工的Id
    return this.http.get(url)                     //获取当前员工的地址转换为承诺
      .toPromise()
      .then(response => response.json().data as Employee)     //转换为数据类型
      .catch(this.handleError);
  }
*/
  delete(id: string): Promise<void> {
    const url = this.usersUrl+id;
    return this.http.delete(url, {headers: this.headers})    //将当前url地址对应的数据删掉   删除后台的 那本地的呢？？？？？？？？？
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(employee: Employee): Promise<Employee> {            
    return this.http
      .post(this.usersUrl, JSON.stringify(employee), {headers: this.headers})  //employee  将添加的数据转成字符串对象？？？？？？？？？？？？、
      .toPromise()
      .then(res => res.json().data)                           // 将添加的数据？？？？？？？
      .catch(this.handleError);
  }

  update(employee: Employee): Promise<Employee> {                 //获取的数据是json，也就是Javascript的对象，数据类型是默认的object，所以要转换数据类型
    const url = this.usersUrl+employee.id;                //这个是更新的那个？
    return this.http
      .put(url, JSON.stringify(Employee), {headers: this.headers})
      .toPromise()
      .then(() => employee)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}