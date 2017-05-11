import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppState, Global } from '../../services/app.service';
declare var moment:any;
@Component({
  selector: 'my-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private employeeId="";
  private employeeName="";
  private employeeDate:string='MM/DD/YYYY';
  private minDate:string='';
  private maxDate:string='12/31/2017';
  private disableDays:Array<number>=[0,6];    //For Sunday and Saturday
  private toContainPrevMonth:boolean = false;
  private toContainNextMonth:boolean = false;
  private value:string='';
  ngOnInit(){
    this.minDate=moment().format('MM/DD/YYYY');
    if(this.appState.state.hasOwnProperty("employeeId")){
      this.employeeId=this.appState.get("employeeId");
    }
    if(this.appState.state.hasOwnProperty("employeeName")){
      this.employeeName=this.appState.get("employeeName");
    }
    if(this.appState.state.hasOwnProperty("employeeDate")){
      this.employeeDate=this.appState.get("employeeDate");
    }

    if(this.employeeId.trim()+this.employeeName.trim()+this.employeeDate.trim()!=""){
      setTimeout(()=>this.search(this.employeeId, this.employeeName, this.employeeDate),50);
    }
  }  
  @Output() public getSearchData = new EventEmitter<object>();
  constructor(private appState: AppState){}
  search(id,name,dateText){
    dateText=dateText.replace("MM/DD/YYYY","");
    this.getSearchData.emit({"id":id,"name":name,"date":dateText});
    this.appState.set("employeeId",id);
    this.appState.set("employeeName",name);
    this.appState.set("employeeDate",dateText);
  }
  setDate(date){
    this.employeeDate = date;
  }

}