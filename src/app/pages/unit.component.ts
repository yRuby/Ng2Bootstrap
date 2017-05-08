import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState, Global } from '../../services/app.service';
import { UnitService } from '../../services/unit.service';

import { Unit } from './unit'  


@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
 
})
export class UnitComponent implements OnInit  {
 titles = ['Employee ID','Name', 'Join Data', 'Operating' ] 

currPageDepts:Unit[]=[];
  editDept:Unit;
  allDepts:Unit[];
  currPage:number=1;
  pageSize:number=5;
  totalPageNum:number;
  constructor(private appState:AppState, private DeptService: UnitService) { }
  ngOnInit(){
    this.getAllData();
  }
  public getPageData(idx: number) {
    this.currPage=idx;
    let s=(idx - 1) * this.pageSize;
    let e=idx * this.pageSize;
    this.currPageDepts = this.allDepts.slice(s, e);
  }
  public getAllData() {
    if(this.appState.hasOwnProperty('DEPTS')) {
      this.allDepts = this.appState.get('DEPTS');
    } else {
      this.DeptService.getDepts()
      .then((depts) => {
        this.appState.set('DEPTS', depts);
        this.allDepts = depts;
        this.totalPageNum=Math.floor((depts.length+this.pageSize-1)/this.pageSize); 
        this.getPageData(1);
      }).catch((err) => { return false; });
    }
  }
  getSearchData(searchKey){// 搜索
    this.allDepts = this.appState.get('DEPTS');
    this.allDepts=this.allDepts.filter(item=>{
      let mid=true;
      if(searchKey.id.trim()!==""){
        mid=item.id.indexOf(searchKey.id.trim())>-1; 
      }
      let mname=true;
      if(searchKey.name.trim()!==""){
          mname=item.name.indexOf(searchKey.name.trim())>-1;
      }
      return mid && mname;
    });
    this.totalPageNum=Math.floor((this.allDepts.length+this.pageSize-1)/this.pageSize); 
    this.getPageData(1);
  }
  edit(i){
    for(let j=0;j<this.currPageDepts.length;j++){
      this.currPageDepts[j].isEdit=false;
    }
    this.currPageDepts[i].isEdit=true;
    this.editDept=JSON.parse(JSON.stringify(this.currPageDepts[i]));
  }
  save(i){
    /// this.DeptService.update(this.currPageDepts[i])
      /// .then(() => {
        this.currPageDepts[i].isEdit=false;
        this.allDepts[this.currPage*this.pageSize-this.pageSize+i]=JSON.parse(JSON.stringify(this.currPageDepts[i]));
        this.appState.set('DEPTS', this.allDepts);
        this.editDept=new Unit();
      /// }).catch((err) => { return false; });
    // console.log(JSON.stringify(this.allDepts));
    // console.log(JSON.stringify(this.currPageDepts));
  }
  cancel(i){
    this.currPageDepts[i]=JSON.parse(JSON.stringify(this.editDept));
    this.currPageDepts[i].isEdit=false;
  }
  delete(i){
    if(confirm("您确定要删除吗？")){
      /// this.DeptService.delete(this.currPageDepts[i].id)
      /// .then(() => {
        this.currPageDepts.splice(i,1);
        this.allDepts.splice(this.currPage*this.pageSize-this.pageSize+i,1);
        this.appState.set('DEPTS', this.allDepts);
      /// }).catch((err) => { return false; });
      // console.log(JSON.stringify(this.allDepts));
      // console.log(JSON.stringify(this.currPageDepts));  
    }
  }
  addDept(){
     /// this.DeptService.create(new Dept())
      /// .then(() => {
        let blankDept={'id':'','name':'','isEdit':true};
        this.currPageDepts.push(blankDept);
        let i=this.currPage*this.pageSize-this.pageSize+this.currPageDepts.length-1;
        this.allDepts.splice(i,0,{'id':'','name':'','isEdit':true});
        this.appState.set('DEPTS', this.allDepts);
        this.editDept=new Unit();
      /// }).catch((err) => { return false; });

    
    
    // console.log(JSON.stringify(this.allDepts));
    // console.log(JSON.stringify(this.currPageDepts));
  }
}

