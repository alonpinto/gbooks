import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuthService } from '../interfaces/auth.interface';
import { LoginArgs, LoginResponse } from '../types';

const mockUsersDb = [
  {
    id: 'user1',
    email: 'demo@gmail.com',
    password: 'demo',
  },
  {
    id: 'user2',
    email: 'demo2@gmail.com',
    password: 'demo2',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(
    private cookieService: CookieService,
    private readonly router: Router
  ) {}

  public login({ email, password }: LoginArgs): LoginResponse {
    const user = mockUsersDb.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return {
        code: 400,
        message: 'failed to login',
        user: null,
      };
    } else {
      const date = new Date();
      this.cookieService.set(
        'user_id',
        user.id,
        date.setDate(date.getDate() + 1)
      );

      return {
        code: 200,
        message: 'Welcome back',
        user: { userId: user.id, email: user.email },
      };
    }
  }

  public logout(): void {
    this.cookieService.delete('user_id');
    this.router.navigate(['/']);
  }

  public getUserId(): string {
    const userId = this.cookieService.get('user_id') || '';
    return userId;
  }
}
