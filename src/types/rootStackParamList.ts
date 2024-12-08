import { WordRequestsItem } from "../screens/post";

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
  Word:
    | undefined
    | {
        message: string;
        username: string;
        requestId: string;
        userId: string;
        messageItem: WordRequestsItem | undefined;
      };
  Login: undefined;
  Register: undefined;
  Post: {
    username: string;
    userId: string;
    image: string;
    userFriends: number;
    messageItem: WordRequestsItem | undefined;
  };
  Profile: undefined;
  Friends: undefined;
  Splash: undefined;
  StatsBoard: undefined;
};
