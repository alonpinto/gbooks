import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { GoogleBookApiServiceService } from '../../services/google-book-api.service';
import { BookType } from '../../types';
import { BookItemComponent } from '../book-item/book-item.component';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MaterialModule, BookItemComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.sass',
})
export class BookListComponent {
  @Input() books: BookType[] = [];

  constructor(
    private readonly bookApiService: GoogleBookApiServiceService,
    private readonly favoriteService: FavoriteService,
    private readonly router: Router
  ) {}

  async toggleFavorite(book: BookType) {
    book.isFavorite = !book.isFavorite;
    this.favoriteService.toggle(book);
  }

  async getMoreInfo(book: BookType) {
    this.router.navigate([`/books/`, book.id], { state: { book } });
  }
}
