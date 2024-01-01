import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { BooksFilterComponent } from '../../components/books-filter/books-filter.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MaterialModule } from '../../material.module';
import { PagerComponent } from '../../pager/pager.component';
import {
  BookType,
  BooksFetchResponseOutput,
  GoogleBookApiServiceService,
} from '../../services/google-book-api.service';

@Component({
  selector: 'app-book-result',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    BooksFilterComponent,
    BookListComponent,
    PagerComponent,
    TopBarComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books-page.component.sass',
})
export class BooksPageComponent {
  constructor(private readonly booksApi: GoogleBookApiServiceService) {}

  term: string = '';
  books: BookType[] = [];
  isFetching: boolean = false;
  error: string = '';
  skip: number = 0;
  limit: number = 10;

  getNextPage() {
    this.skip = this.skip + this.limit;
    this.doSearch(this.term);
  }

  getPrevPage() {
    const startIndex = this.skip - this.limit;
    this.skip = startIndex <= 0 ? 0 : this.skip - this.limit;
    if (startIndex >= 0) {
      this.doSearch(this.term);
    }
  }

  async doSearch(term: string) {
    try {
      this.isFetching = true;
      this.term = term;

      const res: BooksFetchResponseOutput | string =
        await this.booksApi.fetchBooks({
          q: term,
          skip: this.skip,
          limit: this.limit,
        });

      this.isFetching = false;
      this.books = (res as BooksFetchResponseOutput).books;
    } catch (err) {
      this.isFetching = false;
      this.error = 'Error accrued try again! ';
      setTimeout(() => {
        this.error = '';
      }, 2000);
    } finally {
      this.isFetching = false;
    }
  }
}
