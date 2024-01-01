import { Injectable } from '@angular/core';
import { BookType } from './google-book-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private userId: string = 'alon_1';
  private readonly prefixTemplate: string = `favorite_${this.userId}`;

  constructor(private readonly dataLayer: LocalStorageService) {}

  // Set a value in local storage
  add(bookId: string, value: BookType): void {
    const key = `${this.prefixTemplate}~${bookId}`;
    console.log(`FavoriteService=> key ${key}`);
    value.isFavorite = true;
    this.dataLayer.setItem(key, JSON.stringify(value));
  }

  get(bookId: string): BookType | null {
    const key = `${this.prefixTemplate}~${bookId}`;
    const book = this.dataLayer.getItem(key);
    return !book ? null : (JSON.parse(book) as BookType);
  }

  // Get a value from local storage
  remove(bookId: string): void {
    const key = `${this.prefixTemplate}~${bookId}`;
    this.dataLayer.removeItem(key);
  }

  // Remove a value from local storage
  getAll(): string[] {
    return this.dataLayer.getAll(this.prefixTemplate);
  }

  getUserFavorites(): BookType[] {
    const keys = this.getAll();
    const userFavorites: BookType[] = [];

    for (let key of keys) {
      const book = this.dataLayer.getItem(key);
      if (!!book) {
        userFavorites.push(JSON.parse(book) as BookType);
      }
    }

    return userFavorites;
  }

  getUserFavoriteIds(): Set<string> {
    const keys = this.getAll();
    const userFavoriteIds = new Set<string>();
    keys.map((key) => {
      const bookId = key.split('~').at(-1);

      bookId && userFavoriteIds.add(bookId);
    });
    return userFavoriteIds;
  }

  toggle(book: BookType): void {
    const bookId = book.id;

    if (!this.isFavorite(bookId)) {
      this.add(bookId, book);
    } else {
      this.remove(bookId);
    }
  }

  isFavorite(bookId: string): boolean {
    const book = this.get(bookId);

    return !!book ? true : false;
  }

  // Clear all items from local storage
  //   clear(): void {
  //     this.dataLayer.clear();
  //   }
}
