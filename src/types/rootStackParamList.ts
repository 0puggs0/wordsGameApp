export type RootStackParamList = {
  InitialScreen: undefined;
  Stats: undefined | { userId: string; userFriends: number; userName: string };
  Word: undefined | { message: string };
  Login: undefined;
  Register: undefined;
  Post: { username: string; userId: string };
  Profile: undefined;
  Friends: undefined;
};
