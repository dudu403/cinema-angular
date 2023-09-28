import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css'],
})
export class PaginationBarComponent implements OnInit, OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  maxSize: number = 5;
  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generatePageNumbers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] && !changes['totalPages'].firstChange) {
      this.generatePageNumbers();
      console.log(this.totalPages);
    }
  }

  generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
    this.pageChange.emit(page);
  }
}
