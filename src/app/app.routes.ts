import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BooksPageComponent } from './pages/books/books.component';

export const routes: Routes = [
  {
    path: 'books',
    component: BooksPageComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
];
