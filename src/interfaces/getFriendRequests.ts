export interface FriendRequestsData {
  message: Array<FriendRequest>;
}
export interface FriendRequest {
  id: string;
  userId: string;
  username: string;
}
