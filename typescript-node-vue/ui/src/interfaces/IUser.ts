import UserMeta from '@/models/user/Meta';
import Store from '@/classes/Store';
import UserPost from '@/models/user/Post';

export default interface IUser {
  Id: number;
  Username: string;
  Age: number;
  Meta: UserMeta;
  Posts: Store<UserPost>;
}
