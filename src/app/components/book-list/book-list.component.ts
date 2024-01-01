import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FavoriteService } from '../../services/favorite.service';
import {
  BookType,
  GoogleBookApiServiceService,
} from '../../services/google-book-api.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MaterialModule, BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.sass',
})
export class BookListComponent {
  @Input() books: BookType[] = [];

  constructor(
    private readonly bookApiService: GoogleBookApiServiceService,
    private readonly favoriteService: FavoriteService
  ) {}

  async toggleFavorite(book: BookType) {
    book.isFavorite = !book.isFavorite;
    this.favoriteService.toggle(book);
  }
}
