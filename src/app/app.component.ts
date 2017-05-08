import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState, Global } from '../services/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Global]
})
export class AppComponent {


  // 构造函数
  constructor(
    
  ) {


  }

  // 页面初始化
  ngOnInit() {
  }

  

}
