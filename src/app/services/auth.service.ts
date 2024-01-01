import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export type LoginArgs = {
  email: string;
  password: string;
};

export type LogoutArgs = {
  userId: string;
};

export type LoginResponse = {
  code: number;
  message: string;
  user: UserOutput | null;
};

type User = {
  userId: string;
  email: string;
  password: string;
};

export type UserOutput = Omit<User, 'password'>;

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

interface IAuthService {
  login: ({ email, password }: LoginArgs) => LoginResponse;
  logout: ({ userId }: User) => LoginResponse;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(private cookieService: CookieService) {}

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

  public logout({ userId }: LogoutArgs): LoginResponse {
    this.cookieService.delete('user_id');

    return {
      code: 200,
      message: 'Goodbye',
      user: null,
    };
  }
}