import { LoginArgs, LoginResponse } from '../types';

export interface IAuthService {
  login: ({ email, password }: LoginArgs) => LoginResponse;
  logout: () => void;
}
