import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AppState, Global } from '../../services/app.service';

@Component({
  selector: 'unit-search',
  templateUrl: './unitsearch.component.html',
  styleUrls: ['./unitsearch.component.css']
})
export class UnitSearchComponent implements OnInit {
  private unitId="";
  private unitName="";
  @Output() public getSearchData = new EventEmitter<object>();
  //constructor(private _cookieService:CookieService){}
  constructor(private appState:AppState){}
  ngOnInit(){
    //this.deptId=this._cookieService.get("deptId")?this._cookieService.get("deptId"):"";
    //this.deptName=this._cookieService.get("deptName")?this._cookieService.get("deptName"):"";
    if(this.appState.state.hasOwnProperty("DEPTID")){
      this.unitId= this.appState.get("DEPTID");
    }
    if(this.appState.state.hasOwnProperty("DEPTNAME")){
      this.unitName= this.appState.get("DEPTNAME");
    }
    if(this.unitId.trim() + this.unitName.trim()!=""){
      setTimeout(()=>this.search(this.unitId, this.unitName),50);
    }
    
  }
  search(id,name){
    this.getSearchData.emit({"id":id,"name":name});
    //this._cookieService.put("deptId",id);
    //this._cookieService.put("deptName",name);
    this.appState.set("DEPTID",id);
    this.appState.set("DEPTNAME",name);
  }
}
