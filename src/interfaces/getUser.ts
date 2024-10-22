export interface UserData {
  friends: Array<Friend>;
  id: string;
  stats: Stat;
  token: string;
  username: string;
  image: string;
}
export interface Friend {
  created: string;
  id: string;
  username: string;
  image: string;
}

export interface Stat {
  currentStreak: number;
  games: number;
  maxStreak: number;
  percentOfWins: number;
}
