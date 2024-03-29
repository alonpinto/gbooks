import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BookResultServerBookItemDto,
  BookResultServerDto,
} from '../components/dtos/book-result.server.dto';

import { BookType, BooksFetchResponseOutput, FetchBooksArgs } from '../types';
import { AuthService } from './auth.service';
import { FavoriteService } from './favorite.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleBookApiServiceService {
  constructor(
    private http: HttpClient,
    private readonly favoriteService: FavoriteService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async fetchBooks({
    q,
    limit = 10,
    skip = 0,
  }: FetchBooksArgs): Promise<BooksFetchResponseOutput | string> {
    return new Promise((resolve, reject) => {
      const userId = this.authService.getUserId();
      if (!userId) {
        this.authService.logout();
        return;
      }

      if (!q) {
        const error = 'fetchBooks -> term is required';
        console.error(error);
        resolve(error);
        return;
      }
      this.http
        .get<BookResultServerDto>(
          `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${skip}&maxResults=${limit}`
        )

        .subscribe((data) => {
          const favoriteIds: Set<string> =
            this.favoriteService.getUserFavoriteIds();

          resolve({
            total: data.totalItems,
            limit,
            skip,

            books: data?.items?.map((item) =>
              mapperBookServerDtoToClient(item, favoriteIds)
            ),
          });
        });
    });
  }
}

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019';

export const mapperBookServerDtoToClient = (
  book: BookResultServerBookItemDto,
  favoriteIds: Set<string>
): BookType => {
  const { volumeInfo: bookInfo } = book;

  return {
    id: book.id,
    isFavorite: favoriteIds.has(book.id),
    title: bookInfo.title,
    authors: bookInfo.authors,
    description: bookInfo.description || '',
    publishDate: bookInfo.publishedDate,
    smallThumbnail: bookInfo.imageLinks?.smallThumbnail || defaultImage,
    thumbnail: bookInfo.imageLinks?.thumbnail || defaultImage,
    previewLink: bookInfo.previewLink,
    pageCount: bookInfo.pageCount,
    language: bookInfo.language,
  };
};
