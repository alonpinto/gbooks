export type FetchBooksArgs = {
  q: string;
  limit?: number;
  skip?: number;
};

export type BooksFetchResponseOutput = {
  total: number;
  limit: number;
  skip: number;
  books: BookType[];
};

export type BookType = {
  id: string;
  isFavorite: boolean;
  title: string;
  authors: string[];
  description: string;
  publishDate: string;
  smallThumbnail: string;
  thumbnail: string;
  previewLink?: string;
  pageCount: number;
  language: string;
};

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
