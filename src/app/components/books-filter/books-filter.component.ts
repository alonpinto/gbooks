//https://www.googleapis.com/books/v1/volumes?q=computer&key=AIzaSyD4IRTVlGChnYDhmN2bo2aKLii1ZWwx-uM

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
  selector: 'books-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.sass',
})
export class BooksFilterComponent {
  @Output('doSearch') doSearch: EventEmitter<any> = new EventEmitter();

  searchFormControl = new FormControl();

  onSearchClick() {
    const term = this.searchFormControl.value;

    this.searchFormControl.setValue('');
    this.doSearch.emit(term);
  }

  constructor() {
    this.searchFormControl.valueChanges
      .pipe(startWith(this.searchFormControl.value))
      .subscribe(console.log);
  }
}
