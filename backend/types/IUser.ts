export interface IUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  provider?: string; // e.g. "github"
  createdAt?: string;
  updatedAt?: string;
}
