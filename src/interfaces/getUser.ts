export interface UserData {
  friends: Array<Friend>;
  id: string;
  stats: Stat;
  token: string;
  username: string;
}
export interface Friend {
  created: string;
  id: string;
  username: string;
}

export interface Stat {
  currentStreak: number;
  games: number;
  maxStreak: number;
  percentOfWins: number;
}
