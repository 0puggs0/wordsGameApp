export interface SearchUser {
  id: string;
  username: string;
  friends: number;
}
export interface SearchAllUsers {
  message: Array<SearchUser>;
}
