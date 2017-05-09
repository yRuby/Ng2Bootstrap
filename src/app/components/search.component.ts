import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
declare var moment:any;
@Component({
  selector: 'my-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchId="";
  private searchName="";
  private searchDate="";
  private selDate:string='MM/DD/YYYY';
  private minDate:string='';
  private maxDate:string='12/31/2017';
  private disableDays:Array<number>=[0,6];    //For Sunday and Saturday
  private toContainPrevMonth:boolean = false;
  private toContainNextMonth:boolean = false;
  private value:string='';
  ngOnInit(){
    this.minDate=moment().format('MM/DD/YYYY');
    this.searchId=Cookie.get("id");
    this.searchName=Cookie.get("name");
    this.searchDate=Cookie.get("date");
    
  }  
  @Output() public getSearchData = new EventEmitter<object>();
  search(id,name,date){
    date=date.replace("MM/DD/YYYY","");
    this.getSearchData.emit({"id":id,"name":name,"date":date});
    Cookie.set('id', id);
    Cookie.set('name', name);
    Cookie.set('date', date);
  }
  setDate(date){
    this.selDate = date;
  }

}