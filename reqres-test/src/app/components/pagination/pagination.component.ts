import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  Math = Math;
  @Input() totalPages: number = 1;
  @Input() selectedPage: number = 1;
  @Input() maxPages: number = 5;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Array<number> = [];

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['totalPages'].currentValue === changes['totalPages'].previousValue) 
        return;  

      this.initPaginator();
  }

  initPaginator(){
    if (+this.totalPages < 1)
      this.totalPages = 1;
    this.pages = [...Array(this.totalPages).keys()].map(m => m + 1);
  }

  changePage(page: number) {
      if (this.selectedPage === page)
        return;
      this.selectedPage = page;
      this.onPageChange.emit(page);
  }

}
