export interface IUser {
  id: number;
  name: string;
  email: string;
  key: string;
  secret: string;
}

export interface IBook {
  author: string;
  cover: string;
  isbn: string;
  published: number;
  title: string;
}

export interface ISavedBook {
  book: {
    author: string;
    cover: string;
    isbn: string;
    published: number;
    title: string;
    pages: number;
    id: number;
  };
  status: number;
}
