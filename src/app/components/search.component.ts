import { Component, Output, EventEmitter } from '@angular/core';



@Component({
    selector: 'my-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
@Output() public getSearchData = new EventEmitter<object>();
  search(id,name,date){
    this.getSearchData.emit({"id":id,"name":name,"date":date});
  }

}