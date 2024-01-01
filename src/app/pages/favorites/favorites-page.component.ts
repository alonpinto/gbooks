import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MaterialModule } from '../../material.module';

import { FavoriteService } from '../../services/favorite.service';
import { BookType } from '../../types';

@Component({
  selector: 'app-book-result',
  standalone: true,
  imports: [CommonModule, MaterialModule, BookListComponent, TopBarComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.sass',
})
export class FavoritesPageComponent implements OnInit {
  books: BookType[] = [];
  constructor(private readonly favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.books = this.favoriteService.getUserFavorites();
  }
}
