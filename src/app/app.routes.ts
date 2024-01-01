import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BooksPageComponent } from './pages/books/books.component';
import { FavoritesPageComponent } from './pages/favorites/favorites-page.component';

export const routes: Routes = [
  {
    path: 'books',
    component: BooksPageComponent,
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
