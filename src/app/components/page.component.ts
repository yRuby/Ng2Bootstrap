import { Component, Input, Output, EventEmitter }    from '@angular/core';
@Component({
  selector: 'my-page',
  templateUrl: './page.component.html',
  styleUrls: [ './page.component.css' ]
})
export class PageComponent {
    public pages: number[] = [];
    public prevPageDisplay: Boolean;
    public nextPageDisplay: Boolean;
    public prevPage5Display: Boolean;
    public nextPage5Display: Boolean;
    @Output() public getPageData = new EventEmitter<number>();
    private displayPageNumber = 3;
    private _currPage: number = 1;
    private _totalPageNum: number = 0;
    @Input()
    set currPage(currPage: number) {
        this._currPage = currPage;
    }
    get currPage(): number { return this._currPage; }
    @Input()
    set totalPageNum(totalPageNum: number) {
        this._totalPageNum = totalPageNum;
        if (this._currPage) {
            this.Init();
        }
    }
    get totalPageNum(): number { return this._totalPageNum; }
    public gotoPrevPage() {
        this.currPage--;
        this.Init();
        this.getPageData.emit(this.currPage);
    }
    public gotoNextPage() {
        this.currPage++;
        this.Init();
        this.getPageData.emit(this.currPage);
    }
    public gotoPrev5Page() {
        this.currPage -= this.displayPageNumber;
        this.Init();
        this.getPageData.emit(this.currPage);       
    }
    public gotoNext5Page() {
        this.currPage += this.displayPageNumber;
        this.Init();
        this.getPageData.emit(this.currPage);        
    }
    public gotoFirstPage() {
        this.currPage = 1;
        this.Init();
        this.getPageData.emit(this.currPage);
    }
    public gotoEndPage() {
        this.currPage = this.totalPageNum;
        this.Init();
        this.getPageData.emit(this.currPage);
    }
    public gotoPage(e: any) {
        this.currPage = Number(e);
        this.Init();
        this.getPageData.emit(this.currPage);
    }
    private Init() {
        this.currPage = this.currPage < 1 ? 1 : this.currPage;
        if (this.currPage > this.totalPageNum) {
            this.currPage = this.totalPageNum;
        } else {
            this.currPage = this.currPage;
        }
        this.pages = [];
        let step = Math.floor(this.displayPageNumber / 2);
        for (let pg: number = this.currPage - step; pg <= this.currPage + step; pg++) {
            if (pg > 0 && pg <= this.totalPageNum) {
                this.pages.push(pg);
            }
        }
        let pagelength = this.pages.length - 1;
        if (this.currPage <= step) {
            pagelength = this.pages.length - 1;
            for (let i = this.pages[pagelength] + 1; i < this.displayPageNumber + 1; i ++) {
                if (i < this.totalPageNum) {
                    this.pages.push(i);
                }
            }
        } else if (this.currPage > this._totalPageNum - step) {
            for (let i =  this.currPage - step - 1;
                     i > this.totalPageNum - this.displayPageNumber; i --) {
                if (i > 0) {
                    this.pages.unshift(i);
                }
            }
        }
        this.prevPageDisplay = this.currPage === 1;
        this.nextPageDisplay = this.currPage === this.totalPageNum;
        this.prevPage5Display = this.pages[0] === 1;
        pagelength = this.pages.length - 1;
        this.nextPage5Display = this.pages[pagelength] === this.totalPageNum;
       
    }
}
