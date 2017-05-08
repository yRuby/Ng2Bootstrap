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
 titles = ['Employee ID','Name', 'Join Data', 'Operating' ]   //表头

 currPageUsers:Employee[]=[];  //Employee接口，声明数据类型 是一个空数组
  editUser:Employee;           //编辑员工的数据类型
  allUsers:Employee[];         //是将总数据存入Employee数组还是转换数据里边的类型？？？？？？？
  currPage:number=1;           //当前页是1
  pageSize:number=5;           //每页有条数据
  totalPageNum:number;         //总页数
  //unit:Unit[];                 //单位接口转换类型
  constructor(private appState:AppState, private EmployeeService: EmployeeService  /*, private DeptService: DeptService*/) { } //注入服务
  ngOnInit(){
    //this.getAllDept(); //页面加载时执行
    this.getAllData();
  }
  public getPageData(idx: number) {     //获取一页的数据
    this.currPage=idx;                  //当前页
    let s=(idx - 1) * this.pageSize;    //把当前页-1*一页的条数
    let e=idx * this.pageSize;          //当前页的条数
    this.currPageUsers = this.allUsers.slice(s, e);  //一页的数据就是从已经显示过的条数截取到当前页获取到当前页的条数
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
  public getAllData() {                                   //获取总数据
    if(this.appState.hasOwnProperty('USERS')) {           //如果数据已经缓存过了就从已缓存的获取数据
      this.allUsers = this.appState.get('USERS');
    } else {
      this.EmployeeService.getUsers()  //否则就从Employee服务上获取
      .then((users) => {               //传入参数users
        this.appState.set('USERS', users);
        this.allUsers = users;         //把所有参数赋值给users
        this.totalPageNum=Math.floor((users.length+this.pageSize-1)/this.pageSize);  // 总页数 凑整数
        this.getPageData(1);
      }).catch((err) => { return false; });
    }
  }
  getSearchData(searchKey){// 搜索                    ？？？？？？？？？？
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
        mdate=item.date===searchKey.date.replace("/","-");
      }
      return mid && mname && mdate;
    });
    this.totalPageNum=Math.floor((this.allUsers.length+this.pageSize-1)/this.pageSize); 
    this.getPageData(1);
  }
  edit(i){                                                 //i是当前要编辑的数据
    for(let j=0;j<this.currPageUsers.length;j++){          //循环当前页的数据 每条都等于flase 非编辑状态
      this.currPageUsers[j].isEdit=false;
    }
    this.currPageUsers[i].isEdit=true;                     //当前的一条数据 变为true 编辑状态
    this.editUser=JSON.parse(JSON.stringify(this.currPageUsers[i])); //将字符串转换为json
  }
  save(i){
    /// this.UserService.update(this.currPageUsers[i])
      /// .then(() => {
        this.currPageUsers[i].isEdit=false;               //将当前编辑的数据变成非编辑状态
        this.allUsers[this.currPage*this.pageSize-this.pageSize+i]=JSON.parse(JSON.stringify(this.currPageUsers[i]));    //为什么减去一页的条数？？？？
        this.appState.set('USERS', this.allUsers);
        this.editUser=new Employee();                  //new一个实例对象 Employee()这个被调用的构造函数不知道是哪一个？？？？？？？？？？
      /// }).catch((err) => { return false; });
    // console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));
  }
  cancel(i){
    this.currPageUsers[i]=JSON.parse(JSON.stringify(this.editUser));                  //将json转换为字符串，再将字符串转换为json
    this.currPageUsers[i].isEdit=false;                                               //恢复编辑之前的状态，false
  }
  delete(i){
    if(confirm("您确定要删除吗？")){                                    
      /// this.UserService.delete(this.currPageUsers[i].id)
      /// .then(() => {
        this.currPageUsers.splice(i,1);                   //在当前页数据中删除当前条数1条 splice()添加或删除这里没有写明是删除 怎么确定是删除？？？？？？？
        this.allUsers.splice(this.currPage*this.pageSize-this.pageSize+i,1); //从全部数据中删除     删除要操作两遍当前页和全部数据？？？？？
        this.appState.set('USERS', this.allUsers);          //这个set没太懂？？？？？？？？？？    
      /// }).catch((err) => { return false; });
      // console.log(JSON.stringify(this.allUsers));
      // console.log(JSON.stringify(this.currPageUsers));  
    }
  }
  addUser(){
     /// this.UserService.create(new User())
      /// .then(() => {
        let blankUser={'id':'','name':'','date':'','isEdit':true};  //添加
        this.currPageUsers.push(blankUser);
        let i=this.currPage*this.pageSize-this.pageSize+this.currPageUsers.length-1;
        this.allUsers.splice(i,0,{'id':'','name':'','date':'','isEdit':true});
        this.appState.set('USERS', this.allUsers);
        this.editUser=new Employee();
      /// }).catch((err) => { return false; });

    
    
    // console.log(JSON.stringify(this.allUsers));
    // console.log(JSON.stringify(this.currPageUsers));
  }
}

