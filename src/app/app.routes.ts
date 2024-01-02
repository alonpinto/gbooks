import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BooksPageComponent } from './pages/books/books.component';
import { FavoritesPageComponent } from './pages/favorites/favorites-page.component';

export const routes: Routes = [
  {
    path: 'books',
    component: BooksPageComponent,
  },
  {
    path: 'books/:id',
    component: BookPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
];
