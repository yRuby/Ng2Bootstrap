import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState, Global } from '../../services/app.service';
import { EmployeeService } from '../../services/employee.service';

import { Employee } from './employee'


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],

})
export class EmployeeComponent {
  titles = ['Employee ID', 'Name', 'Join Data', 'Operating']

  currPageUsers: Employee[] = [];
  editUser: Employee;           //编辑员工的数据类型
  allUsers: Employee[];
  currPage: number = 1;
  pageSize: number = 5;
  totalPageNum: number;
  //unit:Unit[];                 
  constructor(private appState: AppState, private EmployeeService: EmployeeService  /*, private DeptService: DeptService*/) { }
  ngOnInit() {
    //this.getAllDept(); 
    if(this.appState.state.hasOwnProperty('USERPAGE')) {
      this.currPage=this.appState.get("USERPAGE");
    }
    this.getAllData();
  }
  public getPageData(idx: number) {
    this.currPage=idx;
    if(this.currPage>this.totalPageNum){
      this.currPage=1;
    }
    this.appState.set("USERPAGE",this.currPage);
    let s=(this.currPage - 1) * this.pageSize;
    let e=this.currPage * this.pageSize;
    this.currPageUsers = this.allUsers.slice(s, e);
    this.currPageUsers.forEach(u=>u.isEdit=false);
    //console.log(this.appState.state.hasOwnProperty("CURRPAGEUSERS"));
  }
  /* public getAllDept(){
     this.DeptService.getDepts()
     .then((depts) => {
       if(this.appState.hasOwnProperty('DEPTS')) {
       this.depts = this.appState.get('DEPTS');
     } else {
       this.appState.set('DEPTS', depts);
       this.depts=depts;
     }
       
     }).catch((err) => { return false; });
   }*/
   public getAllData() {
    if(this.appState.state.hasOwnProperty('USERS')) {
      this.allUsers = this.appState.get('USERS');
      this.totalPageNum=Math.floor((this.allUsers.length+this.pageSize-1)/this.pageSize); 
      this.getPageData(this.currPage);
    } else {
      this.EmployeeService.getUsers()
       .then((users) => {
        this.appState.set('USERS', users);
        this.allUsers = users;
        this.totalPageNum=Math.floor((users.length+this.pageSize-1)/this.pageSize); 
        this.getPageData(this.currPage);
      }).catch((err) => { return false; });
    }
  }
   getSearchData(searchKey){// 搜索
    this.allUsers = this.appState.get('USERS');
    this.allUsers=this.allUsers.filter(item=>{
      let mid=true;
      if(searchKey.id.trim()!==""){
        mid=item.id.indexOf(searchKey.id.trim())>-1; 
      }
      let mname=true;
      if(searchKey.name.trim()!==""){
          mname=item.name.indexOf(searchKey.name.trim())>-1;
      }
      let mdate=true;
      if(searchKey.date!==""){
        mdate=item.date===searchKey.date;
      }
      return mid && mname && mdate;
    });
    this.totalPageNum=Math.floor((this.allUsers.length+this.pageSize-1)/this.pageSize);
    this.getPageData(this.currPage);
    //console.log(this.allUsers)
  }
  edit(i) {
    for (let j = 0; j < this.currPageUsers.length; j++) {
      this.currPageUsers[j].isEdit = false;
    }
    this.currPageUsers[i].isEdit = true;
    this.editUser = JSON.parse(JSON.stringify(this.currPageUsers[i]));
  }
  save(i) {
    /// this.UserService.update(this.currPageUsers[i])
      /// .then(() => {
    this.currPageUsers[i].isEdit = false;
    this.allUsers[this.currPage * this.pageSize - this.pageSize + i] = JSON.parse(JSON.stringify(this.currPageUsers[i]));
    this.appState.set('USERS', this.allUsers);
    this.editUser = new Employee();
    /// }).catch((err) => { return false; });
    // console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));              
  }
  cancel(i){
    this.currPageUsers[i]=JSON.parse(JSON.stringify(this.editUser));
    this.currPageUsers[i].isEdit=false;
    // console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));
  }
  delete(i){
    if(confirm("您确定要删除吗？")){
      /// this.UserService.delete(this.currPageUsers[i].id)
      /// .then(() => {
        this.currPageUsers.splice(i,1);
        this.allUsers.splice(this.currPage*this.pageSize-this.pageSize+i,1);
        this.appState.set('USERS', this.allUsers);
      /// }).catch((err) => { return false; });
      // console.log(JSON.stringify(this.allUsers));
      // console.log(JSON.stringify(this.currPageUsers));  
    }
  }
  addUser() {
    /// this.UserService.create(new User())
    /// .then(() => {
    let blankUser = { 'id': '', 'name': '', 'date': '', 'isEdit': true };
    this.currPageUsers.push(blankUser);
    let i = this.currPage * this.pageSize - this.pageSize + this.currPageUsers.length - 1;
    this.allUsers.splice(i, 0, { 'id': '', 'name': '', 'date': '', 'isEdit': true });
    this.appState.set('USERS', this.allUsers);
    this.editUser = new Employee();
    /// }).catch((err) => { return false; });

    // console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));


    //console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));
  }
}

