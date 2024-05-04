export interface IFriendShip {
  userId: string;
  requestId: string;
  following: boolean;
  isApproved: boolean;
}

export type TRequestFor =
  | 'friends'
  | 'friendRequest'
  | 'sendRequest'
  | 'followers'
  | 'following';
