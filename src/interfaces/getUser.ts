export interface UserData {
  friends: Array<Friend>;
  id: string;
  stats: Array<Stat>;
  token: string;
  username: string;
}
export interface Friend {
  created: string;
  id: string;
  username: string;
}

export interface Stat {
  answer: string;
  date: string;
  id: string;
  isWin: boolean;
}
