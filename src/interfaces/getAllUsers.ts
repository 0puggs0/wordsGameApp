export interface SearchUser {
  id: string;
  username: string;
}
export interface SearchAllUsers {
  message: Array<SearchUser>;
}
