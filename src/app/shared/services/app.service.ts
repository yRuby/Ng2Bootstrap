import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
declare var $: any;
export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InteralStateType = { };
  siteDataChange: EventEmitter<any>;// 利用service EventEmitter方式监控下拉框数据变化
  siteSelectedChange: EventEmitter<any>;

  constructor() {
    this.siteDataChange = new EventEmitter();
    this.siteSelectedChange = new EventEmitter();
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InteralStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

@Injectable()
export class Global {

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  constructor(private _http: Http,
    public _appState: AppState) {
  }

  /**
   * 获取当前path
   */
  getCurrentPath(route) {
    let currPath = '';
    let urlArr = route.url._value;
    urlArr.forEach(function(item){
      currPath += '/' + item.path;
    });
    return currPath;
  }

  /**
   * 页面初始化
   */
  init() {

    /**
     * 下拉框组件初始化
     */
    $('.ui.dropdown').dropdown();

    /**
     * tab组件初始化
     */
    var setupTab = function() {
      var titles = $('.sila-tab .tab-header').find('li');  
      var divs = $('.sila-tab .tab-content').find('.dom');    
      if(titles.length != divs.length) return;    
      for(var i=0; i<titles.length; i++){   
        var li = titles[i];  
        li.id = i;      
        li.onclick = function(){  
          for(var j=0; j<titles.length; j++){  
            titles[j].className = '';  
            divs[j].style.display = 'none';  
          }  
          this.className = 'selected';  
          divs[this.id].style.display = 'block';  
        }  
      }
    };

    /**
     * 监控网站数据获取
     */
    var setupSiteDropdownData = function(self) {
      let hasData = self._appState.state['STATEDATA_SITE']; 
      if (hasData) {
        // do nothing
      } else {
        // get data from backend
        self._http.get('/common/sites').toPromise()
          .then(response => {
            var obj = response.json();
            self._appState.siteDataChange.emit(obj);
            self._appState.set('STATEDATA_SITE', obj);
          })
          .catch(self.handleError);
      }    
    };

    /**
     * ui message close event
     */
    $('.message .close').on('click', function () {
      $(this).closest('.message').transition('fade');
    });

    /**
     * dashboard 与 普通页面切换时
     */
    var currentPath = window.location.href;
    if (currentPath.indexOf('#/dashboard') > 0 || currentPath.lastIndexOf('/#/') + 3 == currentPath.length) {
      $('.sila > .body > .left').hide();
      $('.sila > .body > .right').attr('style', 'padding-left:0');
    } else {
      $('.sila > .body > .left').show();
      $('.sila > .body > .right').attr('style', 'padding-left:250px');      
    }

    // excute  
    setupTab();
    setupSiteDropdownData(this);



  }

  

}