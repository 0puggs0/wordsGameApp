export type RootStackParamList = {
  InitialScreen: undefined;
  Stats:
    | undefined
    | {
        userId: string;
        userFriends: number;
        userName: string;
        userImage: string;
      };
  Word: undefined | { message: string; username: string; requestId: string };
  Login: undefined;
  Register: undefined;
  Post: { username: string; userId: string };
  Profile: undefined;
  Friends: undefined;
  Splash: undefined;
};
